# accounts/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.utils import timezone
from .models import CustomUser, UserProgress, LessonProgress, Achievement
from .serializers import (
    UserRegisterSerializer, 
    UserLoginSerializer,
    UserProgressSerializer,
    LessonProgressSerializer,
    AchievementSerializer
)

# Your existing Register and Login views...
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        if request.data.get('role') == 'ADMIN':
            return Response({"error": "Admins cannot register here."}, status=status.HTTP_403_FORBIDDEN)
        
        response = super().create(request, *args, **kwargs)
        
        # Create initial user progress when user registers
        if response.status_code == 201:
            user = CustomUser.objects.get(username=request.data.get('username'))
            UserProgress.objects.create(user=user)
            
            # Create initial achievements
            initial_achievements = [
                {'achievement_id': 1, 'name': 'First Steps', 'description': 'Complete your first lesson', 'icon': '🌱'},
                {'achievement_id': 2, 'name': 'Eco Warrior', 'description': 'Earn 100 eco points', 'icon': '⚡'},
                {'achievement_id': 3, 'name': 'Sustainability Expert', 'description': 'Complete 3 lessons', 'icon': '🏆'},
                {'achievement_id': 4, 'name': 'Green Master', 'description': 'Reach level 5', 'icon': '👑'},
                {'achievement_id': 5, 'name': 'Course Completion', 'description': 'Complete all lessons', 'icon': '🎓'},
            ]
            
            for achievement_data in initial_achievements:
                Achievement.objects.create(user=user, **achievement_data)
        
        return response

class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

# New Progress API Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_progress(request):
    """Get user's complete progress data"""
    user = request.user
    
    # Get or create user progress
    progress, created = UserProgress.objects.get_or_create(user=user)
    
    # Get lesson progress
    lesson_progress = LessonProgress.objects.filter(user=user)
    
    # Get achievements
    achievements = Achievement.objects.filter(user=user)
    
    return Response({
        'userStats': {
            'totalEcoPoints': progress.total_eco_points,
            'level': progress.level,
            'lessonsCompleted': progress.lessons_completed,
            'streakDays': progress.streak_days
        },
        'lessons': LessonProgressSerializer(lesson_progress, many=True).data,
        'achievements': AchievementSerializer(achievements, many=True).data
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_lesson_progress(request):
    """Update lesson progress when a lesson is completed"""
    user = request.user
    data = request.data
    
    lesson_id = data.get('lessonId')
    lesson_title = data.get('lessonTitle', '')
    eco_reward = data.get('ecoReward', 0)
    
    # Get or create lesson progress
    lesson_progress, created = LessonProgress.objects.get_or_create(
        user=user,
        lesson_id=lesson_id,
        defaults={
            'lesson_title': lesson_title,
            'eco_reward': eco_reward,
            'completed': True,
            'completed_at': timezone.now()
        }
    )
    
    if not lesson_progress.completed:
        lesson_progress.completed = True
        lesson_progress.completed_at = timezone.now()
        lesson_progress.save()
        
        # Update user progress
        progress, created = UserProgress.objects.get_or_create(user=user)
        progress.total_eco_points += eco_reward
        progress.level = (progress.total_eco_points // 30) + 1
        progress.lessons_completed = LessonProgress.objects.filter(user=user, completed=True).count()
        progress.save()
        
        # Check and unlock achievements
        check_and_unlock_achievements(user, progress)
        
        return Response({
            'success': True,
            'message': f'Lesson completed! Gained {eco_reward} eco points.',
            'newStats': {
                'totalEcoPoints': progress.total_eco_points,
                'level': progress.level,
                'lessonsCompleted': progress.lessons_completed
            }
        })
    
    return Response({'success': False, 'message': 'Lesson already completed.'})

def check_and_unlock_achievements(user, progress):
    """Check and unlock achievements based on progress"""
    achievements_to_check = [
        {'achievement_id': 1, 'condition': progress.lessons_completed >= 1},
        {'achievement_id': 2, 'condition': progress.total_eco_points >= 100},
        {'achievement_id': 3, 'condition': progress.lessons_completed >= 3},
        {'achievement_id': 4, 'condition': progress.level >= 5},
        {'achievement_id': 5, 'condition': progress.lessons_completed >= 6},  # Assuming 6 total lessons
    ]
    
    for achievement_check in achievements_to_check:
        if achievement_check['condition']:
            achievement = Achievement.objects.filter(
                user=user, 
                achievement_id=achievement_check['achievement_id']
            ).first()
            
            if achievement and not achievement.unlocked:
                achievement.unlocked = True
                achievement.unlocked_at = timezone.now()
                achievement.save()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sync_progress(request):
    """Sync all progress data from frontend"""
    user = request.user
    data = request.data
    
    # Update user stats
    user_stats = data.get('userStats', {})
    progress, created = UserProgress.objects.get_or_create(user=user)
    progress.total_eco_points = user_stats.get('totalEcoPoints', progress.total_eco_points)
    progress.level = user_stats.get('level', progress.level)
    progress.lessons_completed = user_stats.get('lessonsCompleted', progress.lessons_completed)
    progress.streak_days = user_stats.get('streakDays', progress.streak_days)
    progress.save()
    
    # Update lesson progress
    lessons = data.get('lessons', [])
    for lesson_data in lessons:
        lesson_progress, created = LessonProgress.objects.get_or_create(
            user=user,
            lesson_id=lesson_data.get('id'),
            defaults={
                'lesson_title': lesson_data.get('title', ''),
                'completed': lesson_data.get('completed', False),
                'eco_reward': lesson_data.get('ecoReward', 0)
            }
        )
        
        if lesson_data.get('completed') and not lesson_progress.completed:
            lesson_progress.completed = True
            lesson_progress.completed_at = timezone.now()
            lesson_progress.save()
    
    check_and_unlock_achievements(user, progress)
    
    return Response({'success': True, 'message': 'Progress synchronized successfully.'})

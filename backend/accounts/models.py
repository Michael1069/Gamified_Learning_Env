# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('STUDENT', 'Student'),
        ('UNIVERSITY', 'University'),
        ('ADMIN', 'Admin'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='STUDENT')
    username = models.CharField(max_length=150, unique=True)
    email = models.CharField(max_length=150, unique=True)
    
    def __str__(self):
        return f"{self.username}({self.role})"

class UserProgress(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='progress')
    total_eco_points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    lessons_completed = models.IntegerField(default=0)
    streak_days = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - Level {self.level} ({self.total_eco_points} points)"

class LessonProgress(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson_id = models.IntegerField()
    lesson_title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    eco_reward = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'lesson_id']
    
    def __str__(self):
        return f"{self.user.username} - {self.lesson_title} ({'✓' if self.completed else '✗'})"

class Achievement(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='achievements')
    achievement_id = models.IntegerField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=10)
    unlocked = models.BooleanField(default=False)
    unlocked_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'achievement_id']
    
    def __str__(self):
        return f"{self.user.username} - {self.name} ({'🏆' if self.unlocked else '🔒'})"


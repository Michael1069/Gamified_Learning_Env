from django.urls import path
from .views import RegisterView, LoginView, get_user_progress, update_lesson_progress, sync_progress

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('progress/', get_user_progress, name='get_user_progress'),
    path('progress/lesson/', update_lesson_progress, name='update_lesson_progress'),
    path('progress/sync/', sync_progress, name='sync_progress'),
]
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('STUDENT', 'Student'),
        ('UNIVERSITY', 'University'),
        ('ADMIN', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='STUDENT')
    username = models.CharField(max_length=150, unique=True)
    email = models.CharField(max_length=150, unique=True)


    def _str_(self):
        return f"{self.username}({self.role})"

from django.db import models

# Create your models here.
class data(models.Model):
    userid = models.IntegerField()
    name = models.CharField(max_length=300)
    age = models.CharField(max_length=300)
    role = models.CharField(max_length=300, default= "developer")
    department = models.CharField(max_length=300, default="IT")
    experience = models.CharField(max_length=300, default="Fresher")
    salary = models.IntegerField(default=100000)
    dp = models.ImageField(upload_to="dp/", default='dp/blank.png')
    
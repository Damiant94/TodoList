from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Item(models.Model):
  user = models.ForeignKey(
      get_user_model(),
      on_delete=models.CASCADE,
      related_name='items',
  )
  
  name = models.CharField(max_length=50)
  details = models.CharField(max_length=500)
  date = models.DateField()

  def __str__(self):
    return f"{self.name}: {self.details}. Date: {self.date}"
  

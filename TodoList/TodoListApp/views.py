from django.shortcuts import render

# Create your views here.
def login(request):
  return render(request, "TodoListApp/login.html")

def items(request):
  return render(request, "TodoListApp/items.html")

def newItem(request):
  return render(request, "TodoListApp/newitem.html")

def register(request):
  return render(request, "TodoListApp/register.html")

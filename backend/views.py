from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo



class TodoViewset(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    
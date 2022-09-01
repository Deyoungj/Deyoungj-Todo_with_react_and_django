from rest_framework import routers
from .views import TodoViewset

router = routers.DefaultRouter()
router.register(r"todo", TodoViewset, 'todos')



urlpatterns = router.urls
from django.urls import path
from .views import login, signup, recipe_list, save_history, get_history

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('recipes/', recipe_list),
    path('history/', save_history),
    path('history/list/', get_history),
]
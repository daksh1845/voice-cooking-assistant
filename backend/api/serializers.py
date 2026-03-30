from rest_framework import serializers
from .models import Recipe, History

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'image', 'ingredients', 'steps']

class HistorySerializer(serializers.ModelSerializer):
    recipe_title = serializers.CharField(source='recipe.title', read_only=True)
    
    class Meta:
        model = History
        fields = ['id', 'recipe_title', 'created_at']
from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Recipe, History
from .serializers import RecipeSerializer, HistorySerializer
from django.contrib.auth.models import User

@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({'access': str(refresh.access_token), 'refresh': str(refresh), 'username': user.username})
    return Response({'error': 'Invalid'}, status=400)

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'})

@api_view(['GET'])
def recipe_list(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_history(request):
    recipe_id = request.data.get('recipe_id')
    History.objects.create(user=request.user, recipe_id=recipe_id)
    return Response({'message': 'Saved'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_history(request):
    history = History.objects.filter(user=request.user).order_by('-created_at')
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)
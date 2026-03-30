from django.core.management.base import BaseCommand
from api.models import Recipe

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # delete old recipes
        Recipe.objects.all().delete()

        recipes = [
            {"title": "Fried Rice", "image": "recipes/fried_rice.png", "ingredients": "Rice, vegetables, soy sauce", "steps": "1. Cook rice and keep aside, 2. Heat oil in wok, 3. Add vegetables and stir fry, 4. Add rice and soy sauce, mix well"},
            {"title": "Grilled Sandwich", "image": "recipes/grilled_sandwich.png", "ingredients": "Bread, vegetables, butter", "steps": "1. Butter bread slices, 2. Place vegetables between slices, 3. Grill until golden brown, 4. Cut and serve hot"},
            {"title": "Veg Noodles", "image": "recipes/veg_noodles.png", "ingredients": "Noodles, vegetables, soy sauce", "steps": "1. Boil noodles until soft, 2. Drain and rinse, 3. Stir fry vegetables, 4. Add noodles and soy sauce, toss well"},
            {"title": "Tomato Soup", "image": "recipes/tomato_soup.png", "ingredients": "Tomatoes, onion, garlic", "steps": "1. Boil tomatoes with onion and garlic, 2. Blend until smooth, 3. Strain and simmer, 4. Season and serve hot"},
            {"title": "Green Salad", "image": "recipes/Green_Salad.png", "ingredients": "Lettuce, cucumber, dressing", "steps": "1. Wash and chop lettuce, 2. Slice cucumber, 3. Mix vegetables in bowl, 4. Add dressing and toss"},
            {"title": "Veg Pizza", "image": "recipes/Veg_Pizza.png", "ingredients": "Dough, vegetables, cheese", "steps": "1. Roll out dough, 2. Spread sauce, 3. Add toppings and cheese, 4. Bake until golden"},
            {"title": "Veg Burger", "image": "recipes/Veg_Burger.png", "ingredients": "Veg patty, bun, lettuce", "steps": "1. Toast burger buns, 2. Cook veg patty, 3. Assemble with lettuce and sauce, 4. Serve with fries"},
            {"title": "White Pasta", "image": "recipes/White_Pasta.png", "ingredients": "Pasta, cream, vegetables", "steps": "1. Boil pasta, 2. Sauté vegetables, 3. Add cream and season, 4. Mix with pasta"},
            {"title": "Mixed Curry", "image": "recipes/Mixed_Curry.png", "ingredients": "Vegetables, spices", "steps": "1. Sauté onions and spices, 2. Add vegetables, 3. Cook until soft, 4. Simmer with water"},
            {"title": "Clear Soup", "image": "recipes/Clear_Soup.png", "ingredients": "Vegetables, water, spices", "steps": "1. Boil vegetables in water, 2. Add spices, 3. Simmer for 10 minutes, 4. Strain and serve"},
            {"title": "Veg Cutlet", "image": "recipes/Veg_Cutlet.png", "ingredients": "Potato, vegetables, crumbs", "steps": "1. Mash boiled potatoes, 2. Mix with vegetables, 3. Shape into patties, 4. Coat with crumbs and shallow fry"},
            {"title": "Spring Roll", "image": "recipes/Spring_Roll.png", "ingredients": "Wrapper, vegetables", "steps": "1. Prepare vegetable filling, 2. Place filling on wrapper, 3. Roll tightly, 4. Deep fry until crispy"},
            {"title": "Cheese Omelette", "image": "recipes/Cheese_Omelette.png", "ingredients": "Eggs, cheese", "steps": "1. Beat eggs with salt, 2. Heat pan with oil, 3. Pour eggs and spread, 4. Add cheese, fold and serve"},
            {"title": "Veg Wrap", "image": "recipes/Veg_Wrap.png", "ingredients": "Flatbread, vegetables, sauce", "steps": "1. Warm flatbread, 2. Spread sauce, 3. Add vegetables, 4. Roll tightly and serve"},
        ]

        for recipe in recipes:
            Recipe.objects.create(**recipe)

        self.stdout.write("Old recipes deleted, 14 new recipes added with 4 steps each")
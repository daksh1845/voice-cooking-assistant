from django.core.management.base import BaseCommand
from api.models import Recipe

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # delete old recipes
        Recipe.objects.all().delete()

        recipes = [
            {"title": "Fried Rice", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885094/fried_rice_iuulij.png", "ingredients": "Rice, vegetables, soy sauce", "steps": "Cook rice and keep aside, Heat oil in wok, Add vegetables and stir fry, Add rice and soy sauce, mix well"},
            {"title": "Grilled Sandwich", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885093/grilled_sandwich_xndzzi.png", "ingredients": "Bread, vegetables, butter", "steps": "Butter bread slices, Place vegetables between slices, Grill until golden brown, Cut and serve hot"},
            {"title": "Veg Noodles", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885093/veg_noodles_sohynp.png", "ingredients": "Noodles, vegetables, soy sauce", "steps": "Boil noodles until soft, Drain and rinse, Stir fry vegetables, Add noodles and soy sauce, toss well"},
            {"title": "Tomato Soup", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885093/tomato_soup_rv59uc.png", "ingredients": "Tomatoes, onion, garlic", "steps": "Boil tomatoes with onion and garlic, Blend until smooth, Strain and simmer, Season and serve hot"},
            {"title": "Green Salad", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885093/Green_Salad_c6hzod.png", "ingredients": "Lettuce, cucumber, dressing", "steps": "Wash and chop lettuce, Slice cucumber, Mix vegetables in bowl, Add dressing and toss"},
            {"title": "Veg Pizza", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885093/Veg_Pizza_gtomvf.png", "ingredients": "Dough, vegetables, cheese", "steps": "Roll out dough, Spread sauce, Add toppings and cheese, Bake until golden"},
            {"title": "Veg Burger", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885092/Veg_Burger_qvdmhg.png", "ingredients": "Veg patty, bun, lettuce", "steps": "Toast burger buns, Cook veg patty, Assemble with lettuce and sauce, Serve with fries"},
            {"title": "White Pasta", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885091/White_Pasta_do0fu6.png", "ingredients": "Pasta, cream, vegetables", "steps": "Boil pasta, Sauté vegetables, Add cream and season, Mix with pasta"},
            {"title": "Mixed Curry", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885092/Mixed_Curry_mgnops.png", "ingredients": "Vegetables, spices", "steps": "Sauté onions and spices, Add vegetables, Cook until soft, Simmer with water"},
            {"title": "Clear Soup", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885092/Clear_Soup_qmx4t5.png", "ingredients": "Vegetables, water, spices", "steps": "Boil vegetables in water, Add spices, Simmer for 10 minutes, Strain and serve"},
            {"title": "Veg Cutlet", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885092/Veg_Cutlet_vgy28k.png", "ingredients": "Potato, vegetables, crumbs", "steps": "Mash boiled potatoes, Mix with vegetables, Shape into patties, Coat with crumbs and shallow fry"},
            {"title": "Spring Roll", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885092/Spring_Roll_aqoeko.png", "ingredients": "Wrapper, vegetables", "steps": "Prepare vegetable filling, Place filling on wrapper, Roll tightly, Deep fry until crispy"},
            {"title": "Cheese Omelette", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885092/Cheese_Omelette_jjloz7.png", "ingredients": "Eggs, cheese", "steps": "Beat eggs with salt, Heat pan with oil, Pour eggs and spread, Add cheese, fold and serve"},
            {"title": "Veg Wrap", "image": "https://res.cloudinary.com/dfcftd3bu/image/upload/v1774885092/Veg_Wrap_suyhsr.png", "ingredients": "Flatbread, vegetables, sauce", "steps": "Warm flatbread, Spread sauce, Add vegetables, Roll tightly and serve"},
        ]

        for recipe in recipes:
            Recipe.objects.create(**recipe)

        self.stdout.write("Old recipes deleted, 14 new recipes added with 4 steps each")
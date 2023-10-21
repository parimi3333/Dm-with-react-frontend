from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token 
from django.contrib.auth import authenticate
from .models import data

class userSerializer(serializers.ModelSerializer): 
    class Meta:
        model = User
        fields = ['id', 'username', 'password']  

        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": True
            }
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  
        token, created = Token.objects.get_or_create(user=user)
        return user  # Return the created user object

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                data['user'] = user
            else:
                raise serializers.ValidationError("Incorrect username or password.")
        else:
            raise serializers.ValidationError("Both username and password are required.")

        return data
    
class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = data
        fields = "__all__"

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import userSerializer,LoginSerializer,dataSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import data
import os

@api_view(["GET","POST"])
def userauth(request):
    if request.method == "GET":
        pass
    elif request.method == "POST":
        data  = request.data
        serializer = userSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(["GET","POST"])
def LoginView(request):
    if request.method == "POST":
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(["GET","POST", "PUT", "DELETE"])   
@authentication_classes([TokenAuthentication])  
@permission_classes([IsAuthenticated])
def member(request):
    if request.method == 'GET':
        userid = request.query_params.get("userid")
        if userid:
            memberdata = data.objects.get(userid=userid)
            serializer = dataSerializer(memberdata)
        else:
            memberdata = data.objects.all()
            serializer = dataSerializer(memberdata, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = dataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        userid = request.query_params.get("userid")
        if not userid:
            return Response({"error": "userid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            memberdata = data.objects.get(userid=userid)
        except data.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = dataSerializer(memberdata, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        userid = request.query_params.get("userid")
        if not userid:
            return Response({"error": "userid is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            memberdata = data.objects.get(userid=userid)
            memberdata.delete()
            return Response({"status":"deleted successfully"}, status=status.HTTP_200_OK)
        except data.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
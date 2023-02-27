from rest_framework import permissions

# Custom permission that to only allow creators to edit; permission will be set on a specific view


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # 'SAFE_METHODS' are methods that don't modify, so they're safe for other users to use on an object
        # e.g.) 'get' or 'options' requests
        if request.method in permissions.SAFE_METHODS:
            return True
        # If the requested method isn't safe, this will check to see if the user is the creator of the object
        return obj.author == request.user
    # Add the custom permission to the post instance endpoint;
    # i.e.) Edit the permission classes property on the channel detail view


class IfAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # 'SAFE_METHODS' are methods that don't modify, so they're safe for other users to use on an object
        # e.g.) 'get' or 'options' requests
        if request.method in permissions.SAFE_METHODS:
            return True
        # If the requested method isn't safe, this will check to see if the user is the creator of the object
        return request.user.is_superuser
    # Add the custom permission to the post instance endpoint;
    # i.e.) Edit the permission classes property on the channel detail view

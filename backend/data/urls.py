from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user),
    path("login/", views.login_user),
    path("logout/", views.logout_user),
    path("session/check/", views.check_session),
    path("sync-user/", views.sync_user),
    path("users/check/", views.check_user),
    path("destinasi/", views.get_destinasi),
    path("destinasi/<int:destinasi_id>/", views.get_destinasi_by_id),
    path("rencana/", views.get_rencana_user),
    path("rencana/<int:rencana_id>/", views.get_detail_rencana),
]

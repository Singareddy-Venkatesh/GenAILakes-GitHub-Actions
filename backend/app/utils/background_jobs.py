from celery import Celery

celery_app = Celery("tasks", broker="redis://localhost:6379/0")

@celery_app.task
def publish_post(content_id, platforms):
    # Logic to publish to social media platforms
    pass

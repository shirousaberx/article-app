from flask import Flask, request, jsonify
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from database import db
from models import Post
from sqlalchemy.sql import func
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
app.config.from_object("config")
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

migrate = Migrate()
db.init_app(app)
migrate.init_app(app, db)

# with app.app_context():
#     db.create_all()  

@app.route("/article", methods=["POST"])
def create_article():
    data = request.json

    # Validation rules
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()
    category = data.get("category", "").strip()
    status = data.get("status", "").strip()

    errors = {}

    if len(title) < 20:
        errors["title"] = "Title must be at least 20 characters long."
    
    if len(content) < 200:
        errors["content"] = "Content must be at least 200 characters long."
    
    if len(category) < 3:
        errors["category"] = "Category must be at least 3 characters long."
    
    if status not in ["publish", "draft", "trash"]:
        errors["status"] = "Status must be 'publish', 'draft', or 'trash'."

    if errors:
        return jsonify({"errors": errors}), 400  \

    # If validation passes, create new post
    new_post = Post(title=title, content=content, category=category, status=status)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"message": "Post created successfully!", "post_id": new_post.id}), 201

@app.route("/article/<int:limit>/<int:offset>", methods=["GET"])
def get_articles(limit, offset):
    status = request.args.get("status")  # Get status from query parameters

    query = Post.query

    if status:  # Filter by status if provided
        query = query.filter_by(status=status)

    query = query.order_by(func.greatest(Post.created_at, Post.updated_at).desc())
    total_row = query.count()
    posts = query.limit(limit).offset(offset).all()
    
    post_list = []
    for post in posts:
        post_list.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "category": post.category,
            "created_at": post.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": post.updated_at.strftime("%Y-%m-%d %H:%M:%S") if post.updated_at else None,
            "status": post.status
        })

    return jsonify({
        "articles": post_list,
        "total": total_row,
    })

@app.route("/article/<int:post_id>", methods=["GET"])
def get_article(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found."}), 404

    return jsonify({
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "category": post.category,
        "created_at": post.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "updated_at": post.updated_at.strftime("%Y-%m-%d %H:%M:%S") if post.updated_at else None,
        "status": post.status
    })

@app.route("/article/<int:post_id>", methods=["PUT"])
def update_article(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"error": "Post not found."}), 404

    data = request.json

    title = data.get("title", "").strip()
    content = data.get("content", "").strip()
    category = data.get("category", "").strip()
    status = data.get("status", "").strip()

    errors = {}

    if len(title) < 20:
        errors["title"] = "Title must be at least 20 characters long."
    
    if len(content) < 200:
        errors["content"] = "Content must be at least 200 characters long."
    
    if len(category) < 3:
        errors["category"] = "Category must be at least 3 characters long."
    
    if status not in ["publish", "draft", "trash"]:
        errors["status"] = "Status must be 'publish', 'draft', or 'trash'."

    if errors:
        return jsonify({"errors": errors}), 400

    post.title = title
    post.content = content
    post.category = category
    post.status = status
    db.session.commit()

    return jsonify({"message": "Post updated successfully!"})

@app.route("/article/<int:post_id>", methods=["DELETE"])
def delete_article(post_id):
    # Update status to "trash" without fetching the object first
    rows_affected = Post.query.filter_by(id=post_id).update({"status": "trash"})

    if rows_affected == 0:
        return jsonify({"error": "Post not found."}), 404

    db.session.commit()
    return jsonify({"message": "Post moved to trash successfully!"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)

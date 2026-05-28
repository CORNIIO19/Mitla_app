from App import create_app
from App.Infraestructura.base_datos import initialize_database


initialize_database()

app = create_app()


@app.route("/")
def index():
    return {
        "message": "API Gestor Inteligente de Notas funcionando"
    }


if __name__ == "__main__":
    app.run(debug=True)
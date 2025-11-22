export default function Footer() {
    return (
        <footer className="text-center text-muted py-4 mt-5 border-top">
            <div className="container">
                <p className="mb-1">
                    © 2025 MiTienda. Todos los derechos reservados.
                </p>

                <div className="mb-2">
                    <a href="#" className="text-muted mx-2 text-decoration-none">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-muted mx-2 text-decoration-none">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-muted mx-2 text-decoration-none">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                </div>

                <p className="mb-0">
                    <a href="#" className="text-decoration-none text-muted mx-2">Términos</a> |
                    <a href="#" className="text-decoration-none text-muted mx-2">Privacidad</a> |
                    <a href="#" className="text-decoration-none text-muted mx-2">Contacto</a>
                </p>
            </div>
        </footer>
    );
}

import Container from "./Container";

export default function Footer() {
    return (
        <footer
            className="mt-auto"
            style={{ borderTop: '1px solid var(--border)' }}
        >
            <Container className="py-6">
                <p
                    className="text-sm text-center"
                    style={{ color: 'var(--muted)' }}
                >
                    © {new Date().getFullYear()} Inkwell
                </p>
            </Container>
        </footer>
    );
}

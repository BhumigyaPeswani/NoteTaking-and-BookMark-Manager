import Container from "./Container";

export default function Footer() {
    return (
        <footer className="border-t border-border mt-auto">
            <Container className="py-8">
                <p className="text-sm text-muted text-center">
                    © {new Date().getFullYear()} Draftly. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}

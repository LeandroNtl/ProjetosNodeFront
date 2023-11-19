import HeaderContainer from "./style"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {

    return (
        <HeaderContainer>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to="/">Home</Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/cursos">Cursos</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/alunos">Alunos</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>  
        </HeaderContainer>
    );

};

export default Header;
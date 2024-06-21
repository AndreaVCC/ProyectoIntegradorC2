package CarrenoAndrea.ClinicaOdontologica.security;

import CarrenoAndrea.ClinicaOdontologica.entity.Usuario;
import CarrenoAndrea.ClinicaOdontologica.entity.UsuarioRole;
import CarrenoAndrea.ClinicaOdontologica.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatosIniciales implements ApplicationRunner {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Usuario con rol USER
        String passSinCifrarUser = "user";
        String passCifradoUser = passwordEncoder.encode(passSinCifrarUser);
        Usuario usuarioUser = new Usuario("andrea", UsuarioRole.ROLE_USER, passCifradoUser, "andrea@user.com", "andrea");
        usuarioRepository.save(usuarioUser);
        System.out.println("Usuario ROLE_USER creado con pass cifrado: " + passCifradoUser);

        // Usuario con rol ADMIN
        String passSinCifrarAdmin = "admin";
        String passCifradoAdmin = passwordEncoder.encode(passSinCifrarAdmin);
        Usuario usuarioAdmin = new Usuario("andreauser", UsuarioRole.ROLE_ADMIN, passCifradoAdmin, "andrea@admin.com", "admin");
        usuarioRepository.save(usuarioAdmin);
        System.out.println("Usuario ROLE_ADMIN creado con pass cifrado: " + passCifradoAdmin);
    }
}
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Malla Interactiva Enfermería</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Malla Curricular Interactiva - Enfermería</h1>

  <div class="malla-tabla">
    <section class="semestre">
      <h2>I Semestre</h2>
      <ul class="materias">
        <li class="activa" data-nombre="Fundamentos de Enfermería I" data-abre="Integración al Desempeño Profesional I">Fundamentos de Enfermería I</li>
        <li class="activa" data-nombre="Química General y Orgánica" data-abre="Bioquímica">Química General y Orgánica</li>
        <li class="activa" data-nombre="Biología Celular y Genética" data-abre="Histología;Anatomía;Fisiología General;Biología del Desarrollo y Embriología Humana;Bioquímica">Biología Celular y Genética</li>
        <li class="activa" data-nombre="Matemáticas" data-abre="Investigación en Salud I">Matemáticas</li>
        <li class="activa" data-nombre="Física" data-abre="Fisiología General;Investigación en Salud I">Física</li>
        <li class="activa" data-nombre="Ciencias Sociales y Salud I" data-abre="Ciencias Sociales y Salud II">Ciencias Sociales y Salud I</li>
        <li class="activa" data-nombre="Educación en Salud I" data-abre="Educación en Salud II;Clínica de Salud Comunitaria">Educación en Salud I</li>
        <li class="activa" data-nombre="Inglés I" data-abre="Inglés II">Inglés I</li>
      </ul>
    </section>

    <section class="semestre">
      <h2>II Semestre</h2>
      <ul class="materias">
        <li class="bloqueada" data-nombre="Salud Comunitaria I" data-abre="Salud Comunitaria II;Clínica de Salud Comunitaria">Salud Comunitaria I</li>
        <li class="bloqueada" data-nombre="Integración al Desempeño Profesional I" data-abre="Neonatología I">Integración al Desempeño Profesional I</li>
        <li class="bloqueada" data-nombre="Bioquímica" data-abre="Farmacología">Bioquímica</li>
        <li class="bloqueada" data-nombre="Biología del Desarrollo y Embriología Humana" data-abre="Obstetricia Fisiológica I">Biología del Desarrollo y Embriología Humana</li>
        <li class="bloqueada" data-nombre="Fisiología General" data-abre="Fundamentos de Enfermería II;Agentes Vivos de Enfermedad;Neonatología I;Fisiología de Sistemas;Obstetricia Fisiológica I;Inmunología">Fisiología General</li>
        <li class="bloqueada" data-nombre="Anatomía" data-abre="Ginecología Fisiológica;Fundamentos de Enfermería II;Agentes Vivos de Enfermedad;Neonatología I;Obstetricia Fisiológica I">Anatomía</li>
        <li class="bloqueada" data-nombre="Histología" data-abre="Ginecología Fisiológica;Fundamentos de Enfermería II;Agentes Vivos de Enfermedad;Neonatología I;Obstetricia Fisiológica I">Histología</li>
        <li class="bloqueada" data-nombre="Inglés II" data-abre="Inglés III">Inglés II</li>
      </ul>
    </section>
  </div>

  <script>
    function limpiarTexto(texto) {
      return texto.trim().toLowerCase();
    }

    function desbloquearMateriasDesde(nombreMateria) {
      const materia = Array.from(document.querySelectorAll('li[data-nombre]')).find(li =>
        limpiarTexto(li.dataset.nombre) === limpiarTexto(nombreMateria)
      );
      if (!materia || !materia.dataset.abre) return;

      const materiasQueAbre = materia.dataset.abre.split(';').map(limpiarTexto);

      materiasQueAbre.forEach(nombre => {
        const destino = Array.from(document.querySelectorAll('li[data-nombre]')).find(li =>
          limpiarTexto(li.dataset.nombre) === nombre
        );
        if (destino && destino.classList.contains('bloqueada')) {
          destino.classList.remove('bloqueada');
          destino.classList.add('activa', 'desbloqueada-nueva');
          setTimeout(() => destino.classList.remove('desbloqueada-nueva'), 1500);
          destino.addEventListener('click', () => {
            desbloquearMateriasDesde(destino.dataset.nombre);
            guardarProgreso();
          }, { once: true });
        }
      });
    }

    function guardarProgreso() {
      const estadoMaterias = [...document.querySelectorAll('li[data-nombre]')].map(li => ({
        nombre: li.dataset.nombre,
        estado: li.classList.contains('activa') ? 'activa' : 'bloqueada'
      }));
      localStorage.setItem('mallaProgreso', JSON.stringify(estadoMaterias));
    }

    function cargarProgreso() {
      const data = JSON.parse(localStorage.getItem('mallaProgreso'));
      if (!data) return;

      data.forEach(({ nombre, estado }) => {
        const li = [...document.querySelectorAll('li[data-nombre]')].find(el =>
          limpiarTexto(el.dataset.nombre) === limpiarTexto(nombre)
        );
        if (li) {
          li.classList.remove('activa', 'bloqueada');
          li.classList.add(estado);
        }
      });

      document.querySelectorAll('li.activa').forEach(li => {
        li.addEventListener('click', () => {
          desbloquearMateriasDesde(li.dataset.nombre);
          guardarProgreso();
        }, { once: true });
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      cargarProgreso();
      if (!localStorage.getItem('mallaProgreso')) {
        document.querySelectorAll('li.activa').forEach(li => {
          li.addEventListener('click', () => {
            desbloquearMateriasDesde(li.dataset.nombre);
            guardarProgreso();
          }, { once: true });
        });
      }
    });
  </script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

    body {
      font-family: 'Patrick Hand', cursive, sans-serif;
      background: #f9f5f6;
      color: #5b2c2c;
      margin: 20px;
    }

    h1 {
      text-align: center;
      color: #7a3e3e;
      font-size: 2.5rem;
      margin-bottom: 30px;
    }

    .malla-tabla {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
    }

    section.semestre {
      background: #f2e8e8;
      border: 2px dashed #a05151;
      padding: 20px;
      border-radius: 16px;
    }

    section.semestre h2 {
      text-align: center;
      color: #8c4040;
      margin-bottom: 12px;
    }

    ul.materias {
      list-style: none;
      padding: 0;
    }

    ul.materias li {
      background: #f7e9e9;
      border: 2px solid #a15050;
      border-radius: 10px;
      margin-bottom: 10px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    ul.materias li.bloqueada {
      background-color: #e6dada;
      border-color: #b29b9b;
      color: #9e8b8b;
      cursor: not-allowed;
      opacity: 0.6;
      font-style: italic;
    }

    ul.materias li.activa:hover {
      background-color: #ebd3d3;
    }

    .desbloqueada-nueva {
      animation: destacar 1.5s ease-in-out;
    }

    @keyframes destacar {
      0% { background-color: #fddede; transform: scale(1.02); }
      50% { background-color: #f4bebe; }
      100% { background-color: #f7e9e9; transform: scale(1); }
    }
  </style>
</body>
</html>

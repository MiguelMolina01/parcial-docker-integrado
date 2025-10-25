Parcial Docker Integrado
Proyecto completo con Node.js API, PostgreSQL y Docker Compose

# Información del Estudiante
Nombre: Miguel Angel Molina Cruz

Código: MC22I04002

Carrera: Ingeniería en Sistemas Computacionales

Universidad: Universidad de Sonsonate

# Estructura del Proyecto
```text
parcial-docker-integrado/
├── server.js
├── package.json
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── .env
├── README.md
└── docs/
    └── evidencias/
```
# Ejercicio 1 - Servicio Base con Dockerfile
Objetivo
Construir un servicio Node.js funcional y contenerizado con Dockerfile optimizado.

# Comandos ejecutados

# Construir imagen
```
docker build -t parcial-api .
```

# Ejecutar contenedor
```
docker run -d -p 3000:3000 --name parcial-api-container parcial-api
```
# Verificar
```
curl http://localhost:3000/
curl http://localhost:3000/health
```

# Ejercicio 2 - Persistencia con PostgreSQL y Volumen
Objetivo
Ampliar el proyecto agregando una base de datos PostgreSQL con persistencia de datos.

Comandos ejecutados
# Crear volumen
```
docker volume create db_data
```
# Ejecutar PostgreSQL
```
docker run -d \
  --name parcial-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=12345 \
  -e POSTGRES_DB=parcial_db \
  -v db_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15-alpine
```
# Conectar y crear tabla
```
docker exec -it parcial-db psql -U admin -d parcial_db
```
SQL ejecutado
```
sql
CREATE TABLE estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  codigo VARCHAR(50) NOT NULL,
  carrera VARCHAR(100),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO estudiantes (nombre, codigo, carrera) VALUES
  ('Miguel Angel Molina Cruz', 'MC22I04002', 'Ingenieria en Sistemas Computacionales'),
  ('Juan Pérez', '2020001', 'Ingeniería de Sistemas'),
  ('María García', '2020002', 'Ingeniería de Software');
```
Verificación de persistencia

# Reiniciar contenedor
```
docker restart parcial-db
```

# Verificar datos
```
docker exec -it parcial-db psql -U admin -d parcial_db -c "SELECT * FROM estudiantes;"
```

# Ejercicio 3 - Integración Completa con Docker Compose
Objetivo
Integrar los servicios en un único archivo docker-compose.yml con red, dependencias y healthcheck.

Comandos ejecutados

# Levantar proyecto completo
```
docker compose up -d --build
```

# Ver estado de servicios
```
docker compose ps
```

# Ver logs
```
docker compose logs -f
```

# Detener servicios
```
docker compose down
```

📡 Endpoints Disponibles
Endpoint	Método	Descripción
/	GET	Información del estudiante
/health	GET	Estado del servicio API
/db-status	GET	Estado de conexión a BD
/estudiantes	GET	Lista de estudiantes en BD

Ejemplos de uso

# Información del estudiante
```
curl http://localhost:3000/
```

# Health check
```
curl http://localhost:3000/health
```

# Estado de base de datos
```
curl http://localhost:3000/db-status
```

# Listar estudiantes
```
curl http://localhost:3000/estudiantes
```

# Instalación

# Clonar repositorio
```
git clone https://github.com/MiguelMolina01/parcial-docker-integrado.git
cd parcial-docker-integrado
```
# Levantar servicios
```
docker compose up -d --build
```
# Esperar a que DB esté healthy (10-15 segundos)
```
docker compose ps
```

# Crear tabla e insertar datos
```
docker compose exec db psql -U admin -d parcial_db
```
Luego ejecuta el SQL:


```sql
CREATE TABLE IF NOT EXISTS estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  codigo VARCHAR(50) NOT NULL,
  carrera VARCHAR(100),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO estudiantes (nombre, codigo, carrera) VALUES
  ('Miguel Angel Molina Cruz', 'MC22I04002', 'Ingenieria en Sistemas Computacionales'),
  ('Juan Pérez', '2020001', 'Ingeniería de Sistemas'),
  ('María García', '2020002', 'Ingeniería de Software')
ON CONFLICT DO NOTHING;
```
Verificar funcionamiento:

```
curl http://localhost:3000/
curl http://localhost:3000/estudiantes
```

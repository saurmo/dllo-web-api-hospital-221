# API HOSPITAL DLLO WEB 2022-1

## Módulos Generales

1. Citas de pacientes
2. Turnos de empleados
3. Hospitalización de pacientes
4. Facturación
5. Alimentación de pacientes

## 1. Citas de pacientes
- [Maestro] Pacientes 
- [Maestro] Tipos de citas (General, Cirugia)
- [Formulario] Citas (Paciente, Medico, Consultorio, Tipo de cita)

## 2. Turnos de empleados
- [Maestro] Roles (Médico, enfermera auxiliar, enfermera jefe, administrativos, servicios )
- [Maestro] Empleados (Rol)
- [Formulario] Turnos (Empleado, Consultorio )

## 3. Hospitalización de pacientes
- [Maestro] Salas{
    "idHall":"integer"
    "Piso": "integer"
    "Halltype": "string"
    "block": "ineger"

}
- [Maestro] Consultorios (Piso, Sala)
- [Formulario] Ingreso (Paciente, Consultorio, ordenes de medicamentos, ordenes de laboratorios )

## 4. Facturación a pacientes
- [Maestro] Medicamentos
- [Maestro] Instrumentos médicos
- [Formulario] Facturación (Cita y/o medicamentos y/o procedimientos, Paciente)

## 5. Alimentación de pacientes
- [Maestro] Habitaciones (Piso, Sala)
- [Maestro] Tipos de alimentación
- [Formulario] Registro de alimentación (Paciente, habitación)





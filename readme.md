# API HOSPITAL DLLO WEB 2022-1

## Módulos Generales

1. Citas de pacientes
2. Turnos de empleados
3. Hospitalización de pacientes
4. Facturación
5. Alimentación de pacientes

## 1. Citas de pacientes
(Juan diego )
- [Maestro] Pacientes:
        *  Patient
            * idPatient
            * name
            * lastname
            * blodType
            * cellphone
            * addres
            * mail
            * gender
            * idClinicHistory
- [Maestro] Tipos de citas (General, Cirugia):
        * Appointments:
            * idAppointments:
            * idPatient
            * Nurse
            * Time
            * ConsultingRoom
            * AppointmentType
- [Formulario] Citas (Paciente, Medico, Consultorio, Tipo de cita):
        * Appointment_type:
            * idAppointmentType
            * name

## 2. Turnos de empleados
(Cindy)
- [Maestro] Roles (Médico, enfermera auxiliar, enfermera jefe, administrativos, servicios )
- [Maestro] Empleados (Rol)
- [Formulario] Turnos (Empleado, Consultorio )

## 3. Hospitalización de pacientes
(Mauricio)
- [Maestro] Salas
- [Maestro] Consultorios (Piso, Sala)
- [Formulario] Ingreso - HC (Paciente, Consultorio, ordenes de medicamentos, ordenes de laboratorios )

## 4. Facturación a pacientes
(Esteban)
- [Maestro] Medicamentos
- [Maestro] Instrumentos médicos
- [Formulario] Facturación (Cita y/o medicamentos y/o procedimientos, Paciente)

## 5. Alimentación de pacientes
(Jessica)
- [Maestro] Habitaciones (Piso, Sala)
- [Maestro] Tipos de alimentación
- [Formulario] Registro de alimentación (Paciente, habitación)





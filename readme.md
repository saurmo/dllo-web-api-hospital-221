# API HOSPITAL DLLO WEB 2022-1

## Módulos Generales

1. Citas de pacientes
2. Turnos de empleados
3. Hospitalización de pacientes
4. Facturación
5. Alimentación de pacientes

## 1. Citas de pacientes
<<<<<<< HEAD
- [Maestro] Pacientes 
- [Maestro] Tipos de citas (General, Cirugia)
- [Formulario] Citas (Paciente, Medico, Consultorio, Tipo de cita)
=======
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
>>>>>>> 6483a3c4e15121a1e311e43c810a8f69f75f6e09

## 2. Turnos de empleados
- [Maestro] Roles (Médico, enfermera auxiliar, enfermera jefe, administrativos, servicios )
- [Maestro] Empleados (Rol)
- [Formulario] Turnos (Empleado, Consultorio )

## 3. Hospitalización de pacientes
- [Maestro] Salas
- [Maestro] Consultorios (Piso, Sala)
       {
        "idConsultingRoom":"STRING"
        "hall":"integer"
        "availability":"boolean"
        }
- [Formulario] Ingreso (Paciente, Consultorio, ordenes de medicamentos, ordenes de laboratorios )

## 4. Facturación a pacientes
- [Maestro] Medicamentos
-   -idMedicament
-   -medicamentName
-   -concentration
-   -quantity
-   -price
-   -activeBin
- [Maestro] Instrumentos médicos
-   -idMedicalInstrument
-   -instrumentName
-   -quantity
-   -price
-   -activeBin-   
- [Formulario] Facturación (Cita y/o medicamentos y/o procedimientos, Paciente)
-   -idFacture
-   -idMedicament
-   -idMedicalInstrument
-   -idPatient
-   -idclinicHistory
-   -accountStatus
-   -total

## 5. Alimentación de pacientes
<<<<<<< HEAD
- [Maestro] Habitaciones (Piso, Sala)
- [Maestro] Tipos de alimentación
- [Formulario] Registro de alimentación (Paciente, habitación)
=======
- [Maestro] rooms
    - id(Mongo)
	- room-code
	- room-number
	- id-hall

- [Maestro] nutrition-types
    - id(Mongo)
	- nutrition-code	
	- name
	- description
	- periodicity

- [Formulario] nutrition-registry
    - id(Mongo)
	- pacient-identification
	- room-code
	- nutrition-code 
	- comments
>>>>>>> 6483a3c4e15121a1e311e43c810a8f69f75f6e09





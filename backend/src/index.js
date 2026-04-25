require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const employeesRoutes = require('./routes/employees');
const servicesRoutes = require('./routes/services');
const availabilityRoutes = require('./routes/availability');
const appointmentsRoutes = require('./routes/appointments');
const consultationsRoutes = require('./routes/consultations');
const blogRoutes = require('./routes/blog');

const adminAppointmentsRoutes = require('./routes/admin/appointments');
const adminConsultationsRoutes = require('./routes/admin/consultations');
const adminEmployeesRoutes = require('./routes/admin/employees');
const adminServicesRoutes = require('./routes/admin/services');
const adminBlogRoutes = require('./routes/admin/blog');
const adminClientsRoutes = require('./routes/admin/clients');

const employeeAppointmentsRoutes = require('./routes/employee/appointments');
const employeeScheduleRoutes = require('./routes/employee/schedule');
const employeeTimeBlocksRoutes = require('./routes/employee/timeBlocks');
const employeeProfileRoutes = require('./routes/employee/profile');

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.BACKOFFICE_URL || 'http://localhost:3001',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use('/v1/auth', authRoutes);
app.use('/v1/employees', employeesRoutes);
app.use('/v1/services', servicesRoutes);
app.use('/v1/availability', availabilityRoutes);
app.use('/v1/appointments', appointmentsRoutes);
app.use('/v1/consultations', consultationsRoutes);
app.use('/v1/blog', blogRoutes);

// Admin routes
app.use('/v1/admin/appointments', adminAppointmentsRoutes);
app.use('/v1/admin/consultations', adminConsultationsRoutes);
app.use('/v1/admin/employees', adminEmployeesRoutes);
app.use('/v1/admin/services', adminServicesRoutes);
app.use('/v1/admin/blog', adminBlogRoutes);
app.use('/v1/admin/clients', adminClientsRoutes);

// Employee routes
app.use('/v1/employee/appointments', employeeAppointmentsRoutes);
app.use('/v1/employee/schedule', employeeScheduleRoutes);
app.use('/v1/employee/time-blocks', employeeTimeBlocksRoutes);
app.use('/v1/employee/profile', employeeProfileRoutes);

// Health check
app.get('/v1/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 3002;

if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

module.exports = app;

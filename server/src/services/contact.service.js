import Contact from '../models/contact.model.js';
import User from '../models/user.model.js';

export const createContact = async (data) => {
  const assignedUser = await User.findById(data.assignedTo);
  if (!assignedUser || !assignedUser.active || assignedUser.role !== 'sales') {
    const err = new Error(
      'El contacto debe asignarse a un usuario "sales" activo'
    );
    err.status = 400;
    throw err;
  }
  data.status = 'NEW';
  const contact = await Contact.create(data);
  return contact;
};

export const getContacts = async (filters = {}) => {
  const query = { active: true, ...filters };
  const contacts = await Contact.find(query)
    .populate('assignedTo', 'email role')
    .lean();
  return contacts;
};

export const getContactById = async (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const err = new Error('ID de contacto inválido');
    err.status = 400;
    throw err;
  }
  const contact = await Contact.findById(id)
    .populate('assignedTo', 'email role')
    .lean();
  if (!contact || !contact.active) {
    const err = new Error('Contacto no encontrado');
    err.status = 404;
    throw err;
  }
  return contact;
};

export const updateContact = async (id, data) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const err = new Error('ID de contacto inválido');
    err.status = 400;
    throw err;
  }
  const allowedFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'status',
    'notes',
  ];
  const updateData = {};
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) updateData[field] = data[field];
  });
  const contact = await Contact.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate('assignedTo', 'email role')
    .lean();
  if (!contact) {
    const err = new Error('Contacto no encontrado');
    err.status = 404;
    throw err;
  }
  return contact;
};

export const deleteContact = async (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const err = new Error('ID de contacto inválido');
    err.status = 400;
    throw err;
  }
  const contact = await Contact.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  ).lean();
  if (!contact) {
    const err = new Error('Contacto no encontrado');
    err.status = 404;
    throw err;
  }
  return contact;
};

export const updateContactStatus = async (id, status) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const err = new Error('ID de contacto inválido');
    err.status = 400;
    throw err;
  }
  const validStatuses = ['NEW', 'IN_PROGRESS', 'CONTACTED', 'CLOSED'];
  if (!validStatuses.includes(status)) {
    const err = new Error('Estado inválido');
    err.status = 400;
    throw err;
  }
  const contact = await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  )
    .populate('assignedTo', 'email role')
    .lean();
  if (!contact || !contact.active) {
    const err = new Error('Contacto no encontrado');
    err.status = 404;
    throw err;
  }
  return contact;
};

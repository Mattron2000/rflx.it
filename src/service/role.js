import roleRepository from '../repository/role.js';

/**
 * Adds a new role to the system.
 *
 * @param {{ name: string }} role
 *        Role data to insert.
 * @returns {Promise<any>} Promise resolving to the insert result.
 */
function addNewRole(user) {
	return roleRepository.insertNewRole(user.name);
}

export default { addNewRole };

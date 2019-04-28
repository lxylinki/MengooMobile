//const url_prefix = 'http://mengoo.doctor-u.cn/mengoo/';
const url_prefix = 'http://192.168.199.165/mengoo/';

const mengoo_encrypt = url_prefix + 'site/pk';
const mengoo_login = url_prefix + 'site/login';
const mengoo_logout = url_prefix + 'site/logout';
const mengoo_status_check = url_prefix + 'site/profile';

const super_admin_group = 0;
const school_admin_group = 1;
const teacher_group = 2;
const student_group = 3;


export default {
	super_admin_group,
	school_admin_group,
	teacher_group,
	student_group,

	mengoo_login,
	mengoo_logout,
	mengoo_encrypt,
	mengoo_status_check
}
const main_url = 'http://mengoo.doctor-u.cn';
const url_prefix = 'http://mengoo.doctor-u.cn/mengoo/';

const mengoo_encrypt = url_prefix + 'site/pk';
const mengoo_login = url_prefix + 'site/login';
const mengoo_logout = url_prefix + 'site/logout';
const mengoo_status_check = url_prefix + 'site/profile';

//const course_admin_list = url_prefix + 'course/course/admin-list';
//const course_catag_admin_list = url_prefix + 'course/category/admin-list';
const course_list = url_prefix + 'course/course/list';
const course_catag_list = url_prefix + 'course/category/list';
const course_view = url_prefix + 'course/course/view';
const course_detail = url_prefix + 'course/course/detail';
const course_group = url_prefix + 'course/group/list';
const comment_list = url_prefix + 'course/comment/list';
const comment_create = url_prefix + 'course/comment/create';
const comment_update = url_prefix + 'course/comment/update';
const comment_delete = url_prefix + 'course/comment/delete';

const course_struct = url_prefix + 'course/struct/list';
const course_struct_view = url_prefix + 'course/struct/view';
const course_struct_set = url_prefix + 'course/record/struct-set';
const course_get_text = url_prefix + 'course/struct/get-text';
const course_load = url_prefix + 'resources/resource/load/';

const course_notice = url_prefix + 'course/notice/list';

const course_exam = url_prefix + 'course/struct/exam-list';
const exam_view = url_prefix + 'exam/exam/view';
const exam_last = url_prefix + 'exam/exam-record/last';
const exam_join = url_prefix + 'exam/exam-record/join';
const paper_card_view = url_prefix + 'exam/paper-card/view';
const exam_questions = url_prefix + 'exam/exam/questions';

const my_course_list = url_prefix + 'course/course/my-list';
const my_learn_list = url_prefix + 'course/struct/learn-list';
const my_avatar = url_prefix + 'user/user/avatar';
const my_lab_stats = url_prefix + 'course/lab/user-list';
const my_course_stats = url_prefix + 'course/stats/list-stats';

const super_admin_group = 0;
const school_admin_group = 1;
const teacher_group = 2;
const student_group = 3;


export default {
	main_url,
	url_prefix,
	
	super_admin_group,
	school_admin_group,
	teacher_group,
	student_group,

	mengoo_login,
	mengoo_logout,
	mengoo_encrypt,
	mengoo_status_check,

	course_list,
	course_catag_list,
	course_view,
	course_detail,
	course_group,
	comment_list,
	comment_create,
	comment_update,
	comment_delete,

	course_struct,
	course_struct_view,
	course_struct_set,
	course_get_text,
	course_load,

	course_notice,
	course_exam,
	exam_view,
	exam_last,
	exam_join,
	exam_questions,
	paper_card_view,
	
	my_course_list,
	my_learn_list,
	my_avatar,
	my_lab_stats,
	my_course_stats
}
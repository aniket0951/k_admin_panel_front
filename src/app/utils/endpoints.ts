const BASEURL = "http://192.168.0.119:8000/api";
// const BASEURL = "http://127.0.0.1:8000/api";


// -------------------  STUDENTS ------------------------//
const GET_STUDENTS = BASEURL + "/student/get-students/"
const ADD_STUDENT = BASEURL + "/student/add-student"
const TOTAL_COUNT = BASEURL + "/student/total_students"
const GET_STUDENT = BASEURL + "/student/get-student/"
const UPLOAD_PROFILE = BASEURL + "/student/upload-profile"
const APP_PARENT = BASEURL + "/student/add-parent"
const UPDATE_STUDENT = BASEURL + "/student/update-student/"


// -------------------- BRANCHES ------------------------//
const GET_BRANCHES = BASEURL + "/app/get-branches"
const ADD_BRANCH = BASEURL + "/app/add-branch"
const GET_BRANCH = BASEURL + "/app/get-branch/"
const UPDATE_BRANCH = BASEURL + "/app/update-branch/"


// -------------------  EVENTS -------------------------- //
const GET_EVENTS = BASEURL + "/event/get-events/"
const TOTAL_EVENT_COUNT = BASEURL + "/event/total-event"
const ADD_EVENT = BASEURL + "/event/add-event"
const GET_EVENT = BASEURL + "/event/get-event/"


// ------------------  COURSES ------------------------------ //
const LIST_COURSES = BASEURL + "/app/list-course"
const ADD_COURSE = BASEURL +  "/app/add-course"
const DELETE_COURSE = BASEURL + "/app/delete-course/"
const ACTIVE_COURSE = BASEURL + "/app/active-course"
const GET_COURSE = BASEURL + "/app/get-course/"
const UPDATE_COURSE = BASEURL + "/app/update-course"

export {
    BASEURL,
    GET_STUDENTS,
    GET_BRANCHES,
    ADD_STUDENT,
    TOTAL_COUNT,
    GET_STUDENT,
    UPLOAD_PROFILE,
    APP_PARENT,
    UPDATE_STUDENT,
    ADD_BRANCH,
    GET_BRANCH,
    UPDATE_BRANCH,
    GET_EVENTS,
    TOTAL_EVENT_COUNT,
    ADD_EVENT,
    GET_EVENT,
    LIST_COURSES,
    ADD_COURSE,
    DELETE_COURSE,
    ACTIVE_COURSE,
    GET_COURSE,
    UPDATE_COURSE
}
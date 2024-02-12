import { request, gql } from 'graphql-request'

const MASTER_URL = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cls66zab70ieq01uqfn5ri4my/master';
const getCategory = async() => {
    const query = gql`
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
          slug
        }
      }      
      
    `
    const result = await request(MASTER_URL,query)
    return result;
}

const getCourseList = async() => {
  const query = gql`
  query MyQuery {
    courseLists(first: 50, orderBy: createdAt_DESC) {
      author
      demoUrl
      description
      free
      id
      name
      slug
      sourceCode
      tag
      youtubeUrl
      banner {
        url
      }
      chapter {
        ... on Chapter {
          id
          name
          video {
            url
          }
        }
      }
      totalChapters
    }
  }
  
  `
  const result = await request(MASTER_URL,query)
  return result;
}

const checkUserCourseEnrollment = async(slug, email) => {
  const query = gql`
  query MyQuery {
    userEnrollCourses(where: {courseId: "`+slug+`", userEmail: "`+email+`"}) {
      completedChapter {
        ... on CompletedChapter {
          id
          chapterId
        }
      }
      courseId
      id
    }
  }
  
  `
  const result = await request(MASTER_URL,query)
  return result;
}

const saveUserCourseEnrollment = async(slug, email) => {
  const query = gql`
  mutation MyMutation {
    createUserEnrollCourse(
      data: {courseId: "`+slug+`", courseList: {connect: {slug: "`+slug+`"}}, userEmail: "`+email+`"}
    ) {
      id
    }
    publishManyUserEnrollCourses {
      count
    }
  }
  `
  const result = await request(MASTER_URL,query)
  return result;
}

const checkMembership = async(email) => {
  const query = gql`
  query MyQuery {
    memberships(where: {email: "`+email+`", active: true}) {
      id
      createdAt
      email
    }
  }
  `
  const result = await request(MASTER_URL,query)
  return result;
}

const createNewMembership = async(email) => {
  const query = gql`
  mutation MyMutation {
    createMembership(data: {active: true, email: "`+email+`", paymentId: "12345"}) {
      id
    }
    publishManyMemberships {
      count
    }
  }
  `
  const result = await request(MASTER_URL,query)
  return result;
}

const getAllUserEnrollCourses = async(email) => {
  const query = gql`
  query MyQuery {
    userEnrollCourses(where: {userEmail: "`+email+`"}) {
      completedChapter {
        ... on CompletedChapter {
          id
          chapterId
        }
      }
      courseId
      courseList {
        author
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
          }
        }
        demoUrl
        description
        free
        id
        name
        slug
        sourceCode
        tag
        totalChapters
      }
    }
  }
  `
  const result = await request(MASTER_URL,query)
  return result;
}

export default{
    getCategory,
    getCourseList,
    checkUserCourseEnrollment,
    saveUserCourseEnrollment,
    checkMembership,
    createNewMembership,
    getAllUserEnrollCourses
}
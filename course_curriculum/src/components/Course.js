function Course({courses}) {
return (
    <div>
        {
          courses.map
          (
            x => 
            <div key={x.id}>
              <h1>{x.name}</h1>
              {
                x.parts.map(
                course => 
                <p key={course.id}>
                {course.name}: {course.exercises}
                </p>
                )}
                <strong>Total number of exercises: {x.parts.reduce((a,b) => {return a + b.exercises}, 0)}  </strong>
            </div>
          )
        } 
    </div>
);
  }
  


export default Course;
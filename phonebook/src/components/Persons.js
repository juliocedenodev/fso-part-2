const Persons = (props) =>{
    return(
        <div key={props.myKey}>
            
                {props.name}, {props.number}
                <button onClick={props.click}>{props.text}</button>
            
            
        </div>
    );
}

export default Persons;
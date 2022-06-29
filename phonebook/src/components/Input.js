const Input = (props) =>{
    return(
        <div key={props.id}>
        {props.text} <input value={props.value} onChange={props.change}/>
        </div>
    );
}

export default Input;
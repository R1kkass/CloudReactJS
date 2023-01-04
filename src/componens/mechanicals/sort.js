export const sort = (post, value) =>{
    console.log(post)
    if(value=="По новизне"){
      console.log(post)
    return([...post].sort((a, b) => a.id < b.id ? 1 : -1))
        }else if(value=="По названию"){
          console.log(post)
      return ([...post].sort((a, b) => a.fileName > b.fileName ? 1 : -1))
    }else if(value=="По старости"){
      console.log(post)
      return([...post].sort((a, b) => a.id > b.id ?1 : -1))
    }
  }


console.log("welcome to the variant form my fellas");
if(typeof(variantData) !== "undefined"){

    console.log(variantData)
}else{
    console.log("first is undefined");
    
}
if(typeof(varaintData) !== "undefined"){
    console.log(variantData)
}else{
    console.log("second is undefined");
    
}


// returns false if the object is empty
let isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

product_variants = JSON.parse(product_variants);
if (product_variants.length > 0) {
    // product_variants = JSON.parse(product_variants);
    console.log(typeof (product_variants));
    
    console.log("you have product_variants variable passed to the template");
} else {
    console.error("you do not have product_variants variable passed into the template")
}

// returns below
// variant_combinations = [
//     {
//         "color": "white",
//         "size": "84"
//     },
//     {
//         "color": "white",
//         "size": "95"
//     },
//     {
//         "color": "beige",
//         "size": "84"
//     },
//     {
//         "color": "beige",
//         "size": "95"
//     }
// ]s true if the object is empty
const getCombinations = (variant_sets) => {
    // variant_sets:
    // [
    //     {
    //         "name": "color",
    //         "values": [
    //             "white",
    //             "beige"
    //         ]
    //     },
    //     {
    //         "name": "size",
    //         "values": [
    //             "84",
    //             "95"
    //         ]
    //     }
    // ]

    if (!variant_sets || variant_sets.length === 0) {
        console.error("variant_sets is empty");

        return;
    }

    const combinations = [];

    const generateCombinations = (index, variant_combination) => {
        // variant_combination:
        // console.log("your variant_combination is");
        // console.log(variant_combination);

        if (index === variant_sets.length) {
            // Push a copy of the current combination to avoid reference issues
            combinations.push({ ...variant_combination });
            return;
        }

        const currentOption = variant_sets[index];
        for (const value of currentOption.values) {
            // value = "white" or "84"
            // Create a new combination for each recursive call
            const newCombination = { ...variant_combination };
            newCombination[currentOption.name] = value;
            generateCombinations(index + 1, newCombination); // Create a copy of the array
            // variant_combination.pop(); // Backtrack
        }
    }

    generateCombinations(0, {});

    return combinations;
}


//   ----------------------------------------------
// This is to add another option name: e.g. color, size, etc
let add_another_name = (el) => {
    let previous_option_name_id = Number(el.id.slice("_").at(-1)) - 1;
    let previous_option_name_element = document.getElementById(`variant_name_${previous_option_name_id}`);

    let error_message_option_name_element = document.getElementById("error_message_option_name");
    if (previous_option_name_element.value === "") {
        error_message_option_name_element.innerHTML = (`Enter option name for option name ${previous_option_name_id}`);
        return;
    } else {
        error_message_option_name_element.innerHTML = ""
    }

    let current_option_name_id = previous_option_name_id + 1;

    // Delete the previous delete option name element
    let previous_delete_option_name_element = document.getElementById(`delete_option_name_${previous_option_name_id}`);
    if (previous_delete_option_name_element) {
        previous_delete_option_name_element.remove()
    }

    // create a new option name element
    let add_option_name = document.createElement("div");
    add_option_name.setAttribute('class', 'variantCard');
    add_option_name.setAttribute('id', `variantCard_${current_option_name_id}`);
    add_option_name.innerHTML = `<div class="option_name">
    <div class="delete_option_name" id="delete_option_name_${current_option_name_id}" onClick=delete_option_name(this)>
    <svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
    </div>
    <div>Option Name</div>
    <input type="text" placeholder="Add Option Name" name="variant_name_${current_option_name_id}" id="variant_name_${current_option_name_id}">
      </div>
    <div class="optionValues">
      <div>Option Values</div>
       <input type="text" placeholder="Add Option Value 1" name="variant_name_${current_option_name_id}_value_1" id= "variant_name_${current_option_name_id}_value_1">
      <input type="text" placeholder="Add Option Value 2" name="variant_name_${current_option_name_id}_value_2" id= "variant_name_${current_option_name_id}_value_2">
      <div id="variant_name_${current_option_name_id}_add_another_value_3" class="add_another_value" onClick=add_another_value(this,${current_option_name_id})>+ Add Another Option Value</div>
      <div id="error_message_option_value_${current_option_name_id}" class="alert"></div>
    </div>
  </div>`

    // adjust the id of the add_another_name element.
    let next_option_name_id = current_option_name_id + 1;
    el.setAttribute('id', `add_another_name_${next_option_name_id}`)

    // insert the new option name element before add_another_name element.
    el.before(add_option_name)



    document.getElementById("create_table_button").style.display = "block";
    return add_option_name
}
//   ----------------------------------------------
//   ----------------------------------------------
//   ----------------------------------------------

let delete_option_name = (el) => {
    let option_name_id = Number(el.id.slice("_").at(-1))
    let option_name_element = document.getElementById(`variantCard_${option_name_id}`)
    let previous_option_name_id = option_name_id - 1;
    let previous_option_name_element = document.getElementById(`variantCard_${previous_option_name_id}`)
    let previous_option_name_title_element = previous_option_name_element.getElementsByClassName("option_name")[0].children[0]

    let add_another_name_element = document.getElementById(`add_another_name_${(Number(el.id.slice("_").at(-1)) + 1)}`);
    add_another_name_element.id = `add_another_name_${Number(el.id.slice("_").at(-1))}`
    if (previous_option_name_id > 1) {
        let delete_option_name_element = document.createElement("div")
        delete_option_name_element.setAttribute('class', 'delete_option_name');
        delete_option_name_element.setAttribute('id', `delete_option_name_${previous_option_name_id}`);
        delete_option_name_element.setAttribute('onClick', `delete_option_name(this)`);
        delete_option_name_element.innerHTML = `<svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>`

        previous_option_name_title_element.appendChild(delete_option_name_element)
    }

    option_name_element.remove()


    document.getElementById("create_table_button").style.display = "block";

}

let delete_option_value = (el, next_option_name_id, next_option_value_id) => {
    let deleted_option_value_id = Number(el.id.slice("_").at(-1))
    let previous_option_value_emenet_id = deleted_option_value_id - 1
    let previous_option_value_element = document.getElementById(`variant_name_${next_option_name_id}_value_${previous_option_value_emenet_id}`)

    // If we have more than 2 option values, then we can add a delete option value element
    if (previous_option_value_emenet_id > 2) {
        let delete_option_value = document.createElement("div")
        delete_option_value.setAttribute('class', 'delete_option_value');
        delete_option_value.setAttribute('id', `delete_option_value_${previous_option_value_emenet_id}`);
        delete_option_value.setAttribute('onClick', `delete_option_value(this,${next_option_name_id},${previous_option_value_emenet_id})`);
        delete_option_value.innerHTML = '<svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>'
        previous_option_value_element.after(delete_option_value)
    }

    // Now we need to adjust the id of the add_another_value element
    let add_another_value_element = document.getElementById(`variant_name_${next_option_name_id}_add_another_value_${deleted_option_value_id + 1}`);
    add_another_value_element.id = `variant_name_${next_option_name_id}_add_another_value_${deleted_option_value_id}`

    // Finally delete the option value element
    let option_value_id = Number(el.id.slice("_").at(-1))
    let option_value_element = document.getElementById(`variant_name_${next_option_name_id}_value_${option_value_id}`)
    option_value_element.remove()

    // Just in case we have a delete option value element, we need to remove it
    el.remove()




    document.getElementById("create_table_button").style.display = "block";
}


//   ----------------------------------------------
//   ----------------------------------------------
//   ----------------------------------------------

let add_another_value = (el, next_option_name_id) => {

    //   Next option name id is just the current name id that is passed (the id of the variant container)
    // If no next option name id is passed, then we will just set it to 1, indicating the first option name
    if (!next_option_name_id) {
        next_option_name_id = 1
    }


    //   ----------------------------------------------
    let previous_option_value_id = Number(el.id.slice('_').at(-1)) - 1;
    // Get the element of first option name
    let first_option_name = document.getElementById(`variant_name_${next_option_name_id}`);

    // Initilize the error elements
    let empty_option_value = false;
    let empty_option_name = false;

    // Check if any of the previous option values are empty
    for (let i = 1; i <= previous_option_value_id; i++) {
        let option_value = document.getElementById(`variant_name_${next_option_name_id}_value_${i}`);
        if (option_value.value === "") {
            empty_option_value = true
        }
        if (first_option_name.value === "") {
            empty_option_name = true;
        }
    }

    // Get the error element
    error_element = document.getElementById(`error_message_option_value_${next_option_name_id}`);
    // Display errors if any
    if (empty_option_value) {
        error_element.style.display = "block";
        error_element.innerHTML = "Enter Option Value";
        return;
    } else if (empty_option_name) {
        error_element.style.display = "block";
        error_element.innerHTML = "Enter Option Name";
        return;
    } else {
        error_element.style.display = "none";
    }



    let next_option_value_id = Number(el.id.slice("_").at(-1))

    // Create the new option value element
    let add_option_value = document.createElement("input")
    add_option_value.setAttribute('type', 'text');
    add_option_value.setAttribute('placeholder', `Add Option Value ${next_option_value_id}`);
    add_option_value.setAttribute('name', `variant_name_${next_option_name_id}_value_${next_option_value_id}`);
    add_option_value.setAttribute('id', `variant_name_${next_option_name_id}_value_${next_option_value_id}`);
    // Create the new delete option value element
    let delete_option_value = document.createElement("div")
    delete_option_value.setAttribute('class', 'delete_option_value');
    delete_option_value.setAttribute('id', `delete_option_name_${next_option_name_id}_value_${next_option_value_id}`);
    delete_option_value.setAttribute('onClick', `delete_option_value(this,${next_option_name_id},${next_option_value_id})`);
    delete_option_value.innerHTML = '<svg width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>'

    // Delete the previous delete option value element if exists
    let previous_option_delete_element = document.getElementById(`delete_option_name_${next_option_name_id}_value_${previous_option_value_id}`)
    if (previous_option_delete_element) {
        previous_option_delete_element.remove()
    }

    // Add the new option value input element
    el.before(add_option_value)
    // Add the delete option value element
    add_option_value.after(delete_option_value)
    // Adjust the id of the add_another_value element
    el.setAttribute('id', `variant_name_${next_option_name_id}_add_another_value_${next_option_value_id + 1}`)

    document.getElementById("create_table_button").style.display = "block";
}




// This is input field from django marketing.models product form
let hasVariantsCheckbox = document.getElementById('id_has_variants');
let variant_component = document.getElementById('variant_component');
let product_files_form = document.getElementById('product_files_form');

if (hasVariantsCheckbox.checked) {
    variant_component.style.display = 'block';
    product_files_form.style.display = 'none';
    // variant_form_constructor();
}
let toggleVariantForm = () => {
    if (hasVariantsCheckbox.checked) {
        variant_component.style.display = 'block';
        product_files_form.style.display = 'none';
    } else {
        variant_component.style.display = 'none';
        product_files_form.style.display = 'block';
    }
}


hasVariantsCheckbox.addEventListener('change', toggleVariantForm);



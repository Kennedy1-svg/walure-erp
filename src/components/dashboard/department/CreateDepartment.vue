<script lang="ts">
export default {
    name: 'CreateDepartment'
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue'
import { computed, onMounted, reactive, ref,  toRefs  } from 'vue'
import { useStore} from 'vuex'
import * as actionTypes from '../../../store/module/department/constants/actions'
import * as mutationTypes from '../../../store/module/department/constants/mutations'
import { api_url } from '../../../config'


const store = useStore()

const newDepartment:any = computed(() => {
    return store.getters.getNewDepartment.value
})

let isDisabled = ref(true);
let isError:any = ref(false);

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);
const clicked:any = ref(false);

const isEditing:any = computed(() => {
    let answer:any = ref(false)
    if (props.name == 'Create') {
        return
    } else if (props.name == 'Edit') {
        answer = true
    }
    return answer;
})


let errors = reactive ({
    name: false,
    nameText: '',
    description: false,
    descriptionText: '',
    email: false,
    emailText: ''
})
const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

const checkError:any = () =>{
    if (!newDepartment.value.name){
        errors.name = true
        errors.nameText = "Enter Department Name"
    }  else if (newDepartment.value.name.length <= 3) {
        errors.name = true;
        errors.nameText = 'Department name needs to be more than 3 characters'
    } else {
        errors.name = false;
    }

    if (!newDepartment.value.description){
        errors.description = true
        errors.descriptionText = "Enter Department details"
    }  else if (newDepartment.value.description.length <= 3) {
        errors.description = true;
        errors.descriptionText = 'Department description needs to be more than 10 characters'
    } else {
        errors.description = false;
    }

    if (!newDepartment.value.email) {
        errors.email = true;
        errors.emailText = 'Email is required'
    } else if (!newDepartment.value.email.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }


    if (errors.name) {
        errors.name = true;
        isError.value = true;
    } else if (errors.description) {
        errors.description = true;
        isError.value = true;
    }  else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else {
        isError.value = false
        isDisabled.value = false
    }

}

const emits = defineEmits(['close'])

const closeModal:any = () => {
    store.commit(mutationTypes.SetNewDepartment, {})
    emits('close')
}

const randomDigits = computed(() => {
  return Math.floor(1000 + Math.random() * 9000);
})

const uniqueIdentifier:any = () =>{
    console.log("code is here")
    let code = `${newDepartment.value.name.substring(0, 3).toUpperCase()}${randomDigits.value}`
    return code
}

const addDepartment:any = async() => {
    console.log('hi');

    const request:any = `${api_url}api/Department/create-department`;

    let requestData:any = {
        name: newDepartment.value.name,
        email: newDepartment.value.email,
        description: newDepartment.value.description,  
        uniqueIdentifierCode: uniqueIdentifier()

    }


    const newData:any = {
        url: request,
        data: requestData
    }
    console.log('newData', newData)
    console.log(`I am here sha`)
    await store.dispatch(actionTypes.AddNewDepartment, newData)
    console.log(`I am now here sha`)
    // const result = await store.getters.getUsers
    console.log(`I then came here sha`)
    store.commit(mutationTypes.SetNewDepartment, {})
    console.log(`So I am now here sha`)
    closeModal()
    // console.log(`Till I came here sha`)
    
}

const editDepartment:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/Department/edit-department`;

    const departmentdata:any = {
        name: newDepartment.value.name,
        email: newDepartment.value.email,
        description: newDepartment.value.description,  
        uniqueIdentifierCode: uniqueIdentifier(),
        id: newDepartment.value.id
    }

    const newData:any = {
        url: request,
        data: departmentdata,
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.EditDepartment, newData)
    closeModal()
    await store.dispatch(actionTypes.FetchDepartment)
    store.commit(mutationTypes.SetNewDepartment, {})
    setTimeout(() => {
        clicked.value = false
    }, 200);
}


const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addDepartment() : '';
}

const submitEdit:any = () => {
    clicked.value = true;
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editDepartment() : '';
}



</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <h1 class="text-2xl">{{ props.name }} Department</h1>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>

        <form class="text-sm grid">
            <label for="department" class="font-bold">
                Department Name
            </label>
            <input type="text" v-model="newDepartment.name" @focus="checkError" class="p-4 border rounded-md text-xs focus:outline-none block my-3" placeholder="Enter Department" required/>
            <p class="text-[10px] -mt-2 text-red">
                 {{ errors.name ? errors.nameText : '' }}
            </p>

            <label for="department" class="font-bold">
                Email
            </label>
            <input type="text" v-model="newDepartment.email" @focus="checkError" class="p-4 border rounded-md text-xs focus:outline-none block my-3" placeholder="Enter Department" required/>
            <p class="text-[10px] -mt-2 text-red">
                 {{ errors.email ? errors.emailText : '' }}
            </p>

            <label for="department" class="font-bold">
                About
            </label>
            <textarea class="border rounded-md p-2 text-xs focus:outline-none block my-3" v-model="newDepartment.description" @focus="checkError" rows="10" cols="55" maxlength="500" placeholder="About department" required>     
            </textarea>
            <p class="text-[10px] -mt-2 text-red">
                 {{ errors.description ? errors.descriptionText : '' }}
            </p>

            <div class="flex justify-start my-3">
                <button @click.prevent="closeModal" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border border-primary text-primary rounded-md">Cancel</button>
                <button v-if="!isEditing" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border text-white rounded-md" :disabled="clicked" :class="[clicked ? 'bg-grey' : 'bg-primary']">Save</button>
                <button v-else @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md" :disabled="clicked" :class="[clicked.value ? 'bg-grey-400' : '']">Update</button>
               <!-- <button @click.prevent="submit" class="p-4 bg-primary text-white font-semibold rounded-md">Save</button> -->
               
        </div>
        </form>

        

    </div>
    
</template>
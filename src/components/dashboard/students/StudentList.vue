<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
</script>

<template>
    <div class="main grid">
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Student List</h1>
            <p class="text-xl font-medium text-primary">Total : 20</p>
        </div>
        <div class="table">
            <div class="block w-full overflow-x-auto rounded-lg">
                <table class=" border items-center w-full">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                        Name
                        </th>
                        <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Contact Email
                        </th>
                        <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Contact Phone</th>
                        <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Reg No.</th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">IsActive </th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                    </tr>
                    </thead>

                    <tbody class="bg-white">
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            1
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            2
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            3
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            4
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            5
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            6
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            7
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            8
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            9
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    <tr>
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            10
                        </td>
                        <th class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            Temitope Araba
                        </th>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            Olamilekan@gmail.com
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            09088009988
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            WAL/STUD/00009
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="my-2 flex items-center">
                                <label class="relative inline-block h-3 w-8">
                                    <input 
                                        type="checkbox" 
                                        id="checkbox"
                                        checked
                                        >
                                    <span class="toggler round"></span>
                                </label>
                                <p class="px-4">
                                    Active
                                </p> 
                            </div>
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <SvgIcons name="ellipsis" />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="flex items-center pt-6 px-6 mb-20 text-xs text-gray-700 justify-between">
                    <div class="">
                        Page 1 of 10
                    </div>
                    <div class="border-t-0 font-normal align-middle border-l-0 border-r-0 whitespace-nowrap py-4 gap-10 text-left flex items-center">
                        <span>
                            <SvgIcons name="previous" />
                        </span>
                        <span>
                            <SvgIcons name="chevron-left" />
                        </span>
                        <span>
                            <SvgIcons name="chevron-right" />
                        </span>
                        <span>
                            <SvgIcons name="next" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggler {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(227, 227, 227);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .toggler::before {
        @apply absolute w-5 h-5 -left-[4px] -bottom-[4px] bg-primary;
        content: '';
    }

    input:checked + .toggler {
        @apply bg-primary bg-opacity-[38%];
    }

    input:checked + .toggler:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    .toggler.round {
        border-radius: 34px;
    }

    .toggler.round:before {
        border-radius: 50%;
    }

</style>

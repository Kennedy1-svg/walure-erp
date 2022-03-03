<script setup lang="ts">
import ActivityCard from '../ActivityCard.vue';
</script>

<template>
    <div class="grid py-8">
        <div class="title">
            <h1 class="text-xl font-semibold">Recent Activity</h1>
        </div>
        <div class="main">
            <div class="grid grid-cols-2 gap-5">
                <ActivityCard />
                <ActivityCard>
                    <template #title>
                        Talent Request
                    </template>
                    <template #activity>
                        <table>
                            <thead>
                                <th>Company Name</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Femi Farewa
                                    </td>
                                    <td>
                                        <span class="text-yellow-500 py-2 px-3">
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </ActivityCard>
                <ActivityCard>
                    <template #title>
                        Consultancy Request
                    </template>
                    <template #activity>
                        <table>
                            <thead>
                                <th>Company Name</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Femi Farewa
                                    </td>
                                    <td>
                                        <span class="bg-green-500 text-white py-2 px-3">
                                            Approved
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </ActivityCard>
                <ActivityCard>
                    <template #title>
                        Freelancers
                    </template>
                    <template #activity>
                        <table>
                            <thead>
                                <th>Contact Name</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Femi Farewa
                                    </td>
                                    <td>
                                        React js Algorithm
                                    </td>
                                    <td>
                                        <span class="bg-yellow-500 text-white py-2 px-3">
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </ActivityCard>
            </div>
        </div>
    </div>
</template>
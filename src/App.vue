<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex justify-center items-center px-4 flex-1">
      <main class="flex-1 container mx-auto px-4 py-16 prose lg:prose-xl">
        <h1>You are not Shopify.</h1>

        <p>In fact, you are probably <span class="underline">not even close</span>.</p>

        <p>You don't have to scale like Shopify to build a successful business or application.</p>

        <p>It’s unlikely to happen anyway.</p>

        <div class="flex gap-4 items-center justify-between mt-16">
          <div class="flex-1 flex flex-col gap-2">
            <Slider
              v-model="requestsPerSecondIndex"
              :min="0"
              :max="RPS_MAPPING.length - 1"
              :step="1"
            />

            <span class="text-base">Requests per second</span>
          </div>

          <div class="flex-1 flex flex-col gap-2">
            <Slider v-model="hoursPerDay" :min="1" :max="24" :step="1" />

            <span class="text-base">Distributed (mainly) in {{ hoursPerDay }} hours per day.</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Requests per Second</th>
              <th>Requests per Day</th>
              <th>Requests per Month</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                {{ formatter.format(requestsPerSecond) }}
              </td>
              <td>
                {{ formatter.format(requestsPerDay) }}
              </td>
              <td>
                {{ formatter.format(requestsPerMonth) }}
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          So, when someone mentions the <strong>need to scale</strong> with the Cloud or employ a
          different Web framework due to exceeding <strong>130 million requests per month</strong>,
          it's important to note that this translates to only
          <strong>50 requests per second</strong>.
        </p>
      </main>
    </div>

    <footer class="text-center p-4">
      Made by <a href="https://guillaumebriday.fr" class="underline">Guillaume Briday</a>. Edit on
      <a href="https://github.com/guillaumebriday/youarenotshopify/" class="underline">GitHub</a>.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Slider from 'primevue/slider'

const SECOND_PER_HOUR = 3_600
const AVERAGE_DAYS_PER_MONTH = 30.44
const RPS_MAPPING = [
  1, 10, 15, 20, 25, 50, 100, 250, 500, 1_000, 2_500, 5_000, 10_000, 15_000, 20_000
]

const formatter = new Intl.NumberFormat()

const requestsPerSecondIndex = ref(1)
const hoursPerDay = ref(24)

const requestsPerSecond = computed(() => RPS_MAPPING[requestsPerSecondIndex.value])

const secondPerDay = computed(() => SECOND_PER_HOUR * hoursPerDay.value)
const secondPerMonth = computed(() => secondPerDay.value * AVERAGE_DAYS_PER_MONTH)

const requestsPerDay = computed(() => requestsPerSecond.value * secondPerDay.value)
const requestsPerMonth = computed(() => requestsPerSecond.value * secondPerMonth.value)
</script>

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { getInputDataTypeLabel, InputDataType } from '@/lib/input-type-label'
import { cn } from '@/lib/shadcn'
import { Link } from '@tanstack/react-router'
import React, { useState } from 'react'

function JsonLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='-225 -200 1700 1700'
        shapeRendering='geometricPrecision'
        textRendering='geometricPrecision'
        imageRendering='optimizeQuality'
        fillRule='evenodd'
        clipRule='evenodd'>
        <path d='M221.37 618.44h757.94V405.15H755.14c-23.5 0-56.32-12.74-71.82-28.24-15.5-15.5-25-43.47-25-66.97V82.89H88.39c-1.99 0-3.49 1-4.49 2-1.5 1-2 2.5-2 4.5v1155.04c0 1.5 1 3.5 2 4.5 1 1.49 3 1.99 4.49 1.99H972.8c2 0 1.89-.99 2.89-1.99 1.5-1 3.61-3 3.61-4.5v-121.09H221.36c-44.96 0-82-36.9-82-81.99V700.44c0-45.1 36.9-82 82-82zm126.51 117.47h75.24v146.61c0 30.79-2.44 54.23-7.33 70.31-4.92 16.03-14.8 29.67-29.65 40.85-14.86 11.12-33.91 16.72-57.05 16.72-24.53 0-43.51-3.71-56.94-11.06-13.5-7.36-23.89-18.1-31.23-32.3-7.35-14.14-11.69-31.67-12.99-52.53l71.5-10.81c.11 11.81 1.07 20.61 2.81 26.33 1.76 5.78 4.75 10.37 9 13.95 2.87 2.33 6.94 3.46 12.25 3.46 8.4 0 14.58-3.46 18.53-10.37 3.9-6.92 5.87-18.6 5.87-35V735.92zm112.77 180.67l71.17-4.97c1.54 12.81 4.69 22.62 9.44 29.28 7.74 10.88 18.74 16.34 33.09 16.34 10.68 0 18.93-2.76 24.68-8.36 5.81-5.58 8.7-12.07 8.7-19.41 0-6.97-2.71-13.26-8.2-18.79-5.47-5.53-18.23-10.68-38.28-15.65-32.89-8.17-56.27-19.1-70.26-32.74-14.12-13.57-21.18-30.92-21.18-52.03 0-13.83 3.61-26.89 10.85-39.21 7.22-12.38 18.07-22.06 32.59-29.09 14.52-7.04 34.4-10.56 59.65-10.56 31 0 54.62 6.41 70.88 19.29 16.28 12.81 25.92 33.24 29.04 61.27l-70.5 4.65c-1.87-12.25-5.81-21.17-11.81-26.7-6.05-5.6-14.35-8.36-24.9-8.36-8.71 0-15.31 2.07-19.73 6.16-4.4 4.09-6.59 9.12-6.59 15.02 0 4.27 1.81 8.11 5.37 11.57 3.45 3.59 11.8 6.85 25.02 9.93 32.75 7.86 56.2 15.84 70.31 23.87 14.18 8.05 24.52 17.98 30.96 29.92 6.44 11.88 9.66 25.2 9.66 39.96 0 17.29-4.3 33.24-12.88 47.89-8.63 14.58-20.61 25.7-36.08 33.24-15.41 7.54-34.85 11.31-58.33 11.31-41.24 0-69.81-8.86-85.68-26.52-15.88-17.65-24.85-40.09-26.96-67.3zm248.74-45.5c0-44.05 11.02-78.36 33.09-102.87 22.09-24.57 52.82-36.82 92.24-36.82 40.38 0 71.5 12.07 93.34 36.13 21.86 24.13 32.77 57.94 32.77 101.37 0 31.54-4.75 57.36-14.3 77.54-9.54 20.18-23.37 35.89-41.4 47.13-18.07 11.24-40.55 16.84-67.48 16.84-27.33 0-49.99-4.83-67.94-14.52-17.92-9.74-32.49-25.07-43.62-46.06-11.13-20.92-16.72-47.19-16.72-78.74zm74.89.19c0 27.21 4.57 46.81 13.68 58.68 9.13 11.88 21.57 17.85 37.26 17.85 16.1 0 28.65-5.84 37.45-17.47 8.87-11.68 13.28-32.54 13.28-62.77 0-25.39-4.63-43.92-13.84-55.61-9.26-11.76-21.75-17.6-37.56-17.6-15.13 0-27.34 5.97-36.49 17.85-9.21 11.88-13.78 31.61-13.78 59.07zm209.08-135.36h69.99l90.98 149.05V735.91h70.83v269.96h-70.83l-90.48-148.24v148.24h-70.49V735.91zm67.71-117.47h178.37c45.1 0 82 37.04 82 82v340.91c0 44.96-37.03 81.99-82 81.99h-178.37v147c0 17.5-6.99 32.99-18.5 44.5-11.5 11.49-27 18.5-44.5 18.5H62.97c-17.5 0-32.99-7-44.5-18.5-11.49-11.5-18.5-27-18.5-44.5V63.49c0-17.5 7-33 18.5-44.5S45.97.49 62.97.49H700.1c1.5-.5 3-.5 4.5-.5 7 0 14 3 19 7.49h1c1 .5 1.5 1 2.5 2l325.46 329.47c5.5 5.5 9.5 13 9.5 21.5 0 2.5-.5 4.5-1 7v250.98zM732.61 303.47V96.99l232.48 235.47H761.6c-7.99 0-14.99-3.5-20.5-8.49-4.99-5-8.49-12.5-8.49-20.5z' />
      </svg>
    </div>
  )
}

function YamlLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='-100 0 625 525'>
        <polygon
          id='Y'
          points='235.793 0 143.978 137.674 143.978 224.949 87.702 224.949 87.702 137.674 0 0 63.25 0 119.018 88.646 175.243 0 235.793 0 235.793 0'
        />
        <path
          id='A'
          fill='#cb171e'
          d='M330.294,175.451h-101.861l-20.717,50.024h-45.106l95.38,-224.949h46.137l91.51,224.949h-48.2l-17.144,-50.024zm-16.92,-44.911l-31.226,-82.55l-34.837,82.55h66.063z'
        />
        <polygon
          id='M'
          points='87.701 250.177 87.701 470.647 135.004 470.647 135.004 318.569 184.509 420.789 221.743 420.789 272.939 314.976 272.939 470.602 318.318 470.602 318.318 250.177 256.358 250.177 201.381 349.883 149.021 250.177 87.701 250.177 87.701 250.177'
        />
        <polygon
          id='L'
          points='512 422.735 395.638 422.735 395.638 250.125 347.442 250.125 347.442 469.647 512 469.647 512 422.737 512 422.735'
        />
      </svg>
    </div>
  )
}

function JavascriptLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
        <path
          fill='#ffca28'
          d='M2 2h12v12H2V2m3.153 10.027c.267.567.794 1.033 1.694 1.033 1 0 1.686-.533 1.686-1.7V7.507H7.4v3.827c0 .573-.233.72-.6.72-.387 0-.547-.267-.727-.58l-.92.553m3.987-.12c.333.653 1.007 1.153 2.06 1.153 1.067 0 1.867-.553 1.867-1.573 0-.94-.54-1.36-1.5-1.773l-.28-.12c-.487-.207-.694-.347-.694-.68 0-.274.207-.487.54-.487.32 0 .534.14.727.487l.873-.58c-.366-.64-.886-.887-1.6-.887-1.006 0-1.653.64-1.653 1.487 0 .92.54 1.353 1.353 1.7l.28.12c.52.226.827.366.827.753 0 .32-.3.553-.767.553-.553 0-.873-.286-1.113-.686z'
        />
      </svg>
    </div>
  )
}

function TypescriptLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
        <path
          fill='#0288d1'
          d='M2 2h12v12H2V2m7.14 9.907c.333.653 1.007 1.153 2.06 1.153 1.067 0 1.867-.553 1.867-1.573 0-.94-.54-1.36-1.5-1.774l-.28-.12c-.487-.206-.694-.346-.694-.68 0-.273.207-.486.54-.486.32 0 .534.14.727.486l.873-.58c-.366-.64-.886-.886-1.6-.886-1.006 0-1.653.64-1.653 1.486 0 .92.54 1.354 1.353 1.7l.28.12c.52.227.827.367.827.754 0 .32-.3.553-.767.553-.553 0-.873-.287-1.113-.687l-.92.534M8.667 7.5H5.333v1h1v4.833H7.5V8.5h1.167z'
        />
      </svg>
    </div>
  )
}

function PhpLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
        <path
          fill='#777bb3'
          d='M 25 12 C 11.542969 12 1 17.710938 1 25 C 1 32.289063 11.542969 38 25 38 C 38.457031 38 49 32.289063 49 25 C 49 17.710938 38.457031 12 25 12 Z M 22.507813 16 L 25.128906 16 L 24.296875 20 L 26.636719 20 C 28.121094 20 29.117188 20.207031 29.683594 20.726563 C 30.238281 21.238281 30.40625 22.078125 30.183594 23.222656 L 29.144531 28 L 26.480469 28 L 27.4375 23.582031 C 27.554688 22.976563 27.507813 22.554688 27.304688 22.332031 C 27.101563 22.109375 26.65625 22 25.988281 22 L 23.890625 22 L 22.625 28 L 20 28 Z M 11 20 L 16.332031 20 C 18.875 20 20.414063 21.703125 19.8125 24.246094 C 19.113281 27.199219 17.238281 28 13.792969 28 L 12.144531 28 L 11.621094 31 L 8.972656 31 Z M 32 20 L 37.332031 20 C 39.875 20 41.414063 21.703125 40.8125 24.246094 C 40.113281 27.199219 38.238281 28 34.792969 28 L 33.144531 28 L 32.621094 31 L 29.972656 31 Z M 13.269531 22 L 12.515625 26 L 14.226563 26 C 15.707031 26 17.082031 25.832031 17.3125 23.625 C 17.398438 22.769531 17.042969 22 15.332031 22 Z M 34.269531 22 L 33.515625 26 L 35.226563 26 C 36.707031 26 38.082031 25.832031 38.3125 23.625 C 38.398438 22.769531 38.042969 22 36.332031 22 Z'
        />
      </svg>
    </div>
  )
}

function XmlLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          fill='#8bc34a'
          d='M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m.12 13.5 3.74 3.74 1.42-1.41-2.33-2.33 2.33-2.33-1.42-1.41-3.74 3.74m11.16 0-3.74-3.74-1.42 1.41 2.33 2.33-2.33 2.33 1.42 1.41 3.74-3.74z'
        />
      </svg>
    </div>
  )
}

function HtmlLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
        <path
          fill='#E65100'
          d='m4 4 2 22 10 2 10-2 2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2 3.86.77 3.84-.77.29-4H8.84L8 8h16Z'
        />
      </svg>
    </div>
  )
}

function CssLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
        <path
          fill='#42a5f5'
          d='m29.18 4-3.57 18.36-.33 1.64-4.74 1.57-3.28 1.09L13.21 28 2.87 24.05 4.05 18h4.2l-.44 2.85 6.34 2.42.78-.26 6.52-2.16.17-.83.79-4.02H4.44l.74-3.76.05-.24h17.96l.78-4H6l.78-4h22.4z'
        />
      </svg>
    </div>
  )
}

function UrlLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
        <path fill='#42a5f5' d='M10 14h12v4H10z' />
        <path
          fill='#42a5f5'
          d='M12 22H9.562A5.568 5.568 0 0 1 4 16.438v-.876A5.568 5.568 0 0 1 9.562 10H12V6H9.562A9.562 9.562 0 0 0 0 15.562v.876A9.562 9.562 0 0 0 9.562 26H12ZM22.438 6H20v4h2.438A5.568 5.568 0 0 1 28 15.562v.876A5.568 5.568 0 0 1 22.438 22H20v4h2.438A9.562 9.562 0 0 0 32 16.438v-.876A9.562 9.562 0 0 0 22.438 6Z'
        />
      </svg>
    </div>
  )
}

function AiLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='-50 -50 325 325'
        xmlSpace='preserve'>
        <g
          style={{
            stroke: 'none',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'none',
            fillRule: 'nonzero',
            opacity: 1
          }}
          transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
          <path
            d='M 45 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 12.719 C 48 17.376 46.657 18.719 45 18.719 z'
            fill='#383838'
          />
          <path
            d='M 55.267 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 58.267 17.376 56.924 18.719 55.267 18.719 z'
            fill='#383838'
          />
          <path
            d='M 65.533 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 68.533 17.376 67.19 18.719 65.533 18.719 z'
            fill='#383838'
          />
          <path
            d='M 34.733 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 37.733 17.376 36.39 18.719 34.733 18.719 z'
            fill='#383838'
          />
          <path
            d='M 24.467 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 27.467 17.376 26.124 18.719 24.467 18.719 z'
            fill='#383838'
          />

          <path
            d='M 45 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 87 C 48 88.657 46.657 90 45 90 z'
            fill='#383838'
          />
          <path
            d='M 55.267 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 58.267 88.657 56.924 90 55.267 90 z'
            fill='#383838'
          />
          <path
            d='M 65.533 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 68.533 88.657 67.19 90 65.533 90 z'
            fill='#383838'
          />
          <path
            d='M 34.733 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 37.733 88.657 36.39 90 34.733 90 z'
            fill='#383838'
          />
          <path
            d='M 24.467 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 27.467 88.657 26.124 90 24.467 90 z'
            fill='#383838'
          />

          <path
            d='M 15.719 48 H 3 c -1.657 0 -3 -1.343 -3 -3 c 0 -1.657 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 C 18.719 46.657 17.376 48 15.719 48 z'
            fill='#383838'
          />
          <path
            d='M 15.719 37.733 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 37.733 15.719 37.733 z'
            fill='#383838'
          />
          <path
            d='M 15.719 27.467 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 27.467 15.719 27.467 z'
            fill='#383838'
          />
          <path
            d='M 15.719 58.267 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 58.267 15.719 58.267 z'
            fill='#383838'
          />
          <path
            d='M 15.719 68.533 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 68.533 15.719 68.533 z'
            fill='#383838'
          />

          <path
            d='M 87 48 H 74.281 c -1.657 0 -3 -1.343 -3 -3 c 0 -1.657 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 C 90 46.657 88.657 48 87 48 z'
            fill='#383838'
          />
          <path
            d='M 87 37.733 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 37.733 87 37.733 z'
            fill='#383838'
          />
          <path
            d='M 87 27.467 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 27.467 87 27.467 z'
            fill='#383838'
          />
          <path
            d='M 87 58.267 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 58.267 87 58.267 z'
            fill='#383838'
          />
          <path
            d='M 87 68.533 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 68.533 87 68.533 z'
            fill='#383838'
          />

          <path
            d='M 74.281 12.719 H 15.719 c -1.657 0 -3 1.343 -3 3 v 58.562 c 0 1.657 1.343 3 3 3 h 58.562 c 1.657 0 3 -1.343 3 -3 V 15.719 C 77.281 14.063 75.938 12.719 74.281 12.719 z M 48.111 59.046 c 0 1.657 -1.343 3 -3 3 c -1.657 0 -3 -1.343 -3 -3 v -9.752 H 30.675 v 9.752 c 0 1.657 -1.343 3 -3 3 s -3 -1.343 -3 -3 V 39.672 c 0 -6.461 5.257 -11.718 11.718 -11.718 s 11.718 5.257 11.718 11.718 V 59.046 z M 62.325 56.046 c 1.657 0 3 1.343 3 3 s -1.343 3 -3 3 h -7.697 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 0.849 V 33.954 h -0.849 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 7.697 c 1.657 0 3 1.343 3 3 s -1.343 3 -3 3 h -0.849 v 22.092 H 62.325 z'
            fill='#383838'
          />
          <path
            d='M 36.393 33.954 c -3.153 0 -5.718 2.565 -5.718 5.718 v 3.622 h 11.437 v -3.622 C 42.111 36.52 39.546 33.954 36.393 33.954 z'
            fill='#383838'
          />
        </g>
      </svg>
    </div>
  )
}

function UnknownLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m5 2H6v16h12v-9h-7V4z'
          fill='#90a4ae'
        />
      </svg>
    </div>
  )
}

const logoMappings: Record<InputDataType, React.JSX.Element> = {
  unknown: <UnknownLogo />,
  'json-valid': <JsonLogo className='fill-green-600' />,
  'json-broken': <JsonLogo className='fill-red-600' />,
  yaml: <YamlLogo />,
  url: <UrlLogo />,
  xml: <XmlLogo />,
  js: <JavascriptLogo />,
  ts: <TypescriptLogo />,
  php: <PhpLogo />,
  html: <HtmlLogo />,
  css: <CssLogo />,
  ai: <AiLogo />
}

export default function InputTypeIndicator({
  inputDataType = 'unknown',
  inputIsEmpty,
  inputDataTypeOverride = 'unknown',
  className
}: {
  inputDataType: InputDataType
  inputIsEmpty: boolean
  inputDataTypeOverride?: InputDataType
  className?: string
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const inputDataTypeButtonLabel = getInputDataTypeLabel(
    inputDataType,
    inputDataTypeOverride !== 'unknown'
      ? 'action'
      : inputIsEmpty
        ? 'data'
        : 'action'
  )

  return (
    <Popover open={menuIsOpen} onOpenChange={setMenuIsOpen}>
      <PopoverTrigger className={className} aria-label='Select Data Type'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                role='button'
                aria-label={inputDataTypeButtonLabel}
                className='cursor-pointer'>
                {logoMappings[inputDataType]}
              </div>
            </TooltipTrigger>
            <TooltipContent className='px-1 py-0.5'>
              <p className='text-xs'>{inputDataTypeButtonLabel}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent className='w-fit p-2'>
        <div className='grid grid-cols-3 gap-2'>
          {(
            Object.entries(logoMappings) as [InputDataType, React.JSX.Element][]
          ).map(([inputDataTypeOption, logo], index) => (
            <Link
              key={`${inputDataTypeOption}-${index}`}
              aria-label={`Format as ${getInputDataTypeLabel(inputDataTypeOption, 'action')}`}
              to='/formatter'
              search={
                inputDataTypeOption === 'unknown'
                  ? undefined
                  : { type: inputDataTypeOption }
              }
              className='size-6 transition-all ease-in-out hover:scale-105 active:scale-100'
              onClick={() => setMenuIsOpen(false)}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className={cn(
                      'size-6 cursor-pointer transition-all ease-in-out hover:scale-105 active:scale-100',
                      inputDataTypeOverride !== 'unknown' &&
                        inputDataTypeOption === inputDataType
                        ? 'saturate-100'
                        : 'saturate-25'
                    )}>
                    {logo}
                  </TooltipTrigger>

                  <TooltipContent className='px-1 py-0.5'>
                    <p className='cursor-default text-xs'>
                      {getInputDataTypeLabel(inputDataTypeOption, 'action')}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

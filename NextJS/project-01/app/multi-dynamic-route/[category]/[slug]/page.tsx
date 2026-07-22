import React from 'react'

const MultiDynamicRoute = async({params} : {params: Promise<{category: string, slug: string}>}) => {
    const {category , slug} = await params;
  return (
    <div>MultiDynamicRoute{category} is {slug}</div>
  )
}

export default MultiDynamicRoute
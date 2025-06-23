export const icon = (type) => {
    switch (type) {
        case "House": return '/icons//house.png'
        case "Flat": return '/icons/building.png'
        case "Toilet": return '/icons/wc.png'
        case "Shutters": return '/icons/shutter.png'
        case "Blinds": return '/icons/blinds.png'
        case "Dining chairs": return '/icons/dining-table.png'
        case "Arm chairs": return '/icons/arm.png'
        case "Hob": return '/icons/hob.png'
        case "Splashback": return '/splashback.png'
        case "Extractor": return '/icons/extractor.png'
        case "Dishwasher": return '/icons/dish.png'
        case "Microwave": return '/icons/microwave.png'
        case "Washing Machine": return '/icons/washing.png'

    }
    if (type.includes('Bookcase')) {
        return "/icons/bookcase.png"
    }
    if (type.includes('Hall')) {
        return "/icons/hall.png"
    }
    if (type.includes('Bed')) {
        return "/icons/bed.png"
    }
    if (type.includes('Conservatory')) {
        return "/icons/conservatory.png"
    }
    if (type.includes('Iron')) {
        return "/icons/iron.png"
    }
    if (type.includes('Outdoor')) {
        return "/icons/outdoor.png"
    }
    if (type.includes('Kitchen')) {
        return "/icons/kitchen.png"
    }
    if (type.includes('Microwave')) {
        return '/icons/microwave.png'
    }
    if (type.includes('living room')) {
        return '/icons/interior-design.png'
    }
    if (type.includes('Bedroom')) {
        return '/icons/room.png'
    }
    if (type.includes('Bathroom')) {
        return '/icons/bathtub.png'
    }
    if (type.includes('room') || type.includes('Room')) {
        return '/icons/room.png'
    }
    if (type.includes('Hallway')) {
        return '/icons/hallway.png'
    }
    if (type.includes('Garage')) {
        return '/icons/garage.png'
    }
    if (type.includes('Balcony')) {
        return '/icons/balcony.png'
    }
    if (type.includes('Staircase')) {
        return '/icons/stair.png'
    }
    if (type.includes('windows') || type.includes('Windows')) {
        return '/icons/window.png'
    }
    if (type.includes('sofa')) {
        return '/icons/sofa.png'
    }
    if (type.includes('Mattress')) {
        return '/icons/mattress.png'
    }
    if (type.includes('Rug')) {
        return '/icons/rug.png'
    }
    if (type.includes('cooker')) {
        return '/icons/cooker.png'
    }
    if (type.includes('oven') || type.includes('Oven')) {
        return '/icons/oven.png'
    }
    if (type.includes('Curtains')) {
        return '/icons/curtains.png'
    }
    if (type.includes('Freezer') || type.includes('Fridge')) {
        return '/icons/fridge.png'
    }
    if (type.includes('Lounge')) {
        return '/icons/sofa.png'
    }

    return ''
}

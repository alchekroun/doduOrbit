const PlanetOrbitType = {
    CIRCLE: 0,
    ELLIPTIC: 1
}


class Planet {
    constructor(
        name,
        size,
        getAngleFn,
        getPositionFn,
        img,
        orbitType,
        orbitRadiusA,
        orbitRadiusB = 0,
        orbitSpeed = 1,
        alignShift = 0,
        trailSize = 5,
    ) {
        this.name = name;
        this.size = size;
        this.getAngle = getAngleFn;
        this.getPosition = getPositionFn;
        this.img = img;
        this.orbitType = orbitType;
        this.orbitRadiusA = orbitRadiusA;
        if (orbitType == PlanetOrbitType.ELLIPTIC && orbitRadiusB != 0) {
            this.orbitRadiusB = orbitRadiusB;
        } else if (orbitType == PlanetOrbitType.ELLIPTIC && orbitRadiusB == 0) {
            throw new Error("An elliptic orbit need an orbitRadiusB different from 0. Otherwise use an circle orbit");
        }
        this.orbitSpeed = orbitSpeed;
        this.alignShift = alignShift;
        this.trail = [];
        this.trailSize = trailSize;
    }

    incrTrail(p) {
        this.trail.push(p);
        if (this.trail.length > this.trailSize) this.trail.shift();
    }
}

export { Planet, PlanetOrbitType }
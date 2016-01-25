import _ from 'underscore';

export default class Model {
    getSlots () {
        return _.reduce(
            _.pairs(this.constructor.needs),
            (slots, [key, {type, atLeast, atMost}]) => {
                const isCollection = atLeast !== undefined || atMost !== undefined;
                const definedCount = this.getDefinedCount(key);

                if (!isCollection && definedCount === 1) {
                    return slots;
                }

                if (typeof type === 'string') {
                    return slots.concat({
                        type,
                        key
                    });
                } else {
                    const Type = type;
                    const isFirst = 0 === definedCount;
                    const lastIsViable =  !isFirst && this[key][definedCount - 1].isViable();
                    const canAddMore = (undefined === atMost) || (definedCount < atMost);

                    const mergeChildSlots = (slots, index, instance) => slots.concat(
                        instance.getSlots().map(
                            slot => {
                                const pos = isCollection ?
                                    `[${index}]` :
                                    ''
                                ;
                                return Object.assign(
                                    {},
                                    slot,
                                    { key: key + pos + '.' + slot.key }
                                );
                            }
                        )
                    );

                    let allSlots = slots;
                    if (isFirst || (lastIsViable && canAddMore)) {
                        allSlots = mergeChildSlots(allSlots, definedCount, new Type());
                    }

                    if (!isFirst) {
                        allSlots = mergeChildSlots(allSlots, definedCount - 1, this[key][definedCount - 1]);
                    }

                    return allSlots;
                }
            }, []
        );
    }

    getDefinedCount (key) {
        if (Object.hasOwnProperty.call(this, key)) {
            if (_.isArray(this[key])) {
                return this[key].length;
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    }

    isViable () {
        const validateProp = ([key, {atLeast, atMost}]) => {
            const count = this.getDefinedCount(key);

            if ((atLeast !== undefined) && (count < atLeast)) {
                return false;
            }
            if ((atMost !== undefined) && (count > atMost)) {
                return false;
            }
            if (atLeast === undefined && atMost === undefined) {
                return 1 === count;
            }

            return true;
        };

        const propIsInvalid = (...args) => !validateProp(...args);

        return _.find(_.pairs(this.constructor.needs), propIsInvalid) === undefined;
    }
}

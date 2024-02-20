import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd'
import draggableConstructorElementStyles from './draggable-constructor-element.module.css';
import { removeIngredient } from '../../../services/reducers/burgerConstructor';

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {TConstructorIngredientData} from '../../../utils/types';

type TBurgerConstructorElement = {
    item: TConstructorIngredientData,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
    index: number,
}

type TDragObject = {
    id: string,
    index: number,
}

type TDragCollectedProps = {
   isDragging: boolean,
}

const DraggableConstructorElement = ({item, moveCard, index}: TBurgerConstructorElement): React.JSX.Element => {
    const dispatch = useDispatch();

    const ref = useRef<HTMLDivElement | null>(null)

    const { key, name, price, image } = item

    const [, drop] = useDrop<TDragObject, unknown, unknown>({
        accept: 'item',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
        type: 'item',
        item: () => {
            return { id: key, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    drag(drop(ref));

    return (
        <div ref={ref} style={{opacity}} className={draggableConstructorElementStyles.container}>
            <div className="mr-2">
                <DragIcon type="primary" />
            </div>

            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                // @ts-ignore
                handleClose={() => dispatch(removeIngredient(item.key))}
            />
        </div>
    );
};

export default DraggableConstructorElement;

import Proptypes from "prop-types"

function Button({text}) {
    return (
        <button>
            {text}
        </button>
    );
}

Button.propTypes = {
    text: Proptypes.string.isRequired,
};

export default Button;